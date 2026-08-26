/**
 * Table of Contents (TOC) Observer Module
 */

type VisibleHeadingsCallback = (
  visibleIds: string[],
  headingMap: Map<string, string>
) => void
type ScrollProgressCallback = (progress: number) => void
type CleanupFn = () => void
type ComponentInitFn = () => CleanupFn | void

interface HeadingRegion {
  id: string
  text: string
  start: number
  end: number
  headingBottom: number // Cached to prevent layout thrashing
}

class TOCObserver {
  private static instance: TOCObserver | null = null

  private headingRegions: HeadingRegion[] = []
  private headings: HTMLElement[] = []
  private headingMap: Map<string, string> = new Map()
  private activeIds: string[] = []
  private scrollProgress: number = 0
  private cachedScrollableDistance: number = 0

  private headingSubscribers: Set<VisibleHeadingsCallback> = new Set()
  private progressSubscribers: Set<ScrollProgressCallback> = new Set()
  private componentInits: Set<ComponentInitFn> = new Set()
  private activeCleanups: CleanupFn[] = []

  private isListening = false
  private isTicking = false
  private headerOffset = 140

  static getInstance(): TOCObserver {
    if (!TOCObserver.instance) {
      TOCObserver.instance = new TOCObserver()
      TOCObserver.instance.bindAstroEvents()
    }
    return TOCObserver.instance
  }

  private bindAstroEvents() {
    if (typeof document === "undefined") return

    document.addEventListener("astro:page-load", () => this.init())
    document.addEventListener("astro:after-swap", () => {
      this.cleanup()
      this.init()
    })
    document.addEventListener("astro:before-swap", () => this.cleanup())
  }

  registerComponent(initFn: ComponentInitFn) {
    this.componentInits.add(initFn)
    if (this.isListening) {
      const cleanup = initFn()
      if (cleanup) this.activeCleanups.push(cleanup)
      this.notifySubscribers()
    }
  }

  subscribeVisibleHeadings(callback: VisibleHeadingsCallback): () => void {
    this.headingSubscribers.add(callback)
    callback(this.activeIds, this.headingMap)
    return () => this.headingSubscribers.delete(callback)
  }

  subscribeScrollProgress(callback: ScrollProgressCallback): () => void {
    this.progressSubscribers.add(callback)
    callback(this.scrollProgress)
    return () => this.progressSubscribers.delete(callback)
  }

  private buildHeadingRegions() {
    this.headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".prose h2, .prose h3, .prose h4, .prose h5, .prose h6"
      )
    )

    this.headingMap.clear()

    // Cache scrollable distance to prevent reading documentElement on scroll
    this.cachedScrollableDistance =
      document.documentElement.scrollHeight - window.innerHeight

    if (this.headings.length === 0) {
      this.headingRegions = []
      return
    }

    this.headingRegions = this.headings.map((heading, index) => {
      if (heading.id && heading.textContent) {
        this.headingMap.set(heading.id, heading.textContent.trim())
      }

      const nextHeading = this.headings[index + 1]
      return {
        id: heading.id,
        text: heading.textContent?.trim() || "",
        start: heading.offsetTop,
        headingBottom: heading.offsetTop + heading.offsetHeight,
        end: nextHeading ? nextHeading.offsetTop : document.body.scrollHeight,
      }
    })
  }

  private calculateVisibleIds(): string[] {
    if (this.headingRegions.length === 0) return []

    const viewportTop = window.scrollY + this.headerOffset
    const viewportBottom = window.scrollY + window.innerHeight
    const visibleIds = new Set<string>()

    const isInViewport = (top: number, bottom: number) =>
      (top >= viewportTop && top <= viewportBottom) ||
      (bottom >= viewportTop && bottom <= viewportBottom) ||
      (top <= viewportTop && bottom >= viewportBottom)

    this.headingRegions.forEach((region) => {
      // 1. Check if the heading element itself is visible
      if (isInViewport(region.start, region.headingBottom)) {
        visibleIds.add(region.id)
      }

      // 2. Check if the region content is taking up the viewport
      if (region.start <= viewportBottom && region.end >= viewportTop) {
        if (
          region.end > region.headingBottom &&
          (region.headingBottom < viewportBottom || viewportTop < region.end)
        ) {
          visibleIds.add(region.id)
        }
      }
    })

    return Array.from(visibleIds)
  }

  private calculateScrollProgress(): number {
    if (this.cachedScrollableDistance <= 0) return 0
    return Math.min(
      Math.max(window.scrollY / this.cachedScrollableDistance, 0),
      1
    )
  }

  // Uses requestAnimationFrame to throttle scroll calculations
  private handleScroll = () => {
    if (!this.isTicking) {
      window.requestAnimationFrame(() => {
        this.processScroll()
        this.isTicking = false
      })
      this.isTicking = true
    }
  }

  private processScroll = () => {
    const newActiveIds = this.calculateVisibleIds()
    const newProgress = this.calculateScrollProgress()

    const headingsChanged =
      newActiveIds.length !== this.activeIds.length ||
      newActiveIds.some((id, i) => id !== this.activeIds[i])

    if (headingsChanged) {
      this.activeIds = newActiveIds
      this.headingSubscribers.forEach((sub) =>
        sub(this.activeIds, this.headingMap)
      )
    }

    if (Math.abs(newProgress - this.scrollProgress) > 0.001) {
      this.scrollProgress = newProgress
      this.progressSubscribers.forEach((sub) => sub(this.scrollProgress))
    }
  }

  private handleResize = () => {
    this.buildHeadingRegions()
    this.processScroll()
  }

  private notifySubscribers() {
    this.headingSubscribers.forEach((sub) =>
      sub(this.activeIds, this.headingMap)
    )
    this.progressSubscribers.forEach((sub) => sub(this.scrollProgress))
  }

  private init() {
    this.cleanup()
    this.buildHeadingRegions()
    this.activeIds = this.calculateVisibleIds()
    this.scrollProgress = this.calculateScrollProgress()

    const options = { passive: true }
    window.addEventListener("scroll", this.handleScroll, options)
    window.addEventListener("resize", this.handleResize, options)
    this.isListening = true

    this.componentInits.forEach((initFn) => {
      const cleanup = initFn()
      if (cleanup) this.activeCleanups.push(cleanup)
    })

    this.notifySubscribers()
  }

  private cleanup() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleResize)
    this.isListening = false
    this.isTicking = false

    this.activeCleanups.forEach((cleanup) => cleanup())
    this.activeCleanups = []

    // Clear component inits to prevent memory leaks during Astro SPA navigation
    this.componentInits.clear()

    this.activeIds = []
    this.headings = []
    this.headingRegions = []
    this.headingMap.clear()
  }
}

export function initTOCObserver(initFn: ComponentInitFn) {
  TOCObserver.getInstance().registerComponent(initFn)
}

export function subscribeToVisibleHeadings(
  callback: VisibleHeadingsCallback
): () => void {
  return TOCObserver.getInstance().subscribeVisibleHeadings(callback)
}

export function subscribeToScrollProgress(
  callback: ScrollProgressCallback
): () => void {
  return TOCObserver.getInstance().subscribeScrollProgress(callback)
}

export function scrollToActiveItem(
  scrollContainer: HTMLElement,
  activeItem: HTMLElement
) {
  const containerRect = scrollContainer.getBoundingClientRect()
  const itemRect = activeItem.getBoundingClientRect()

  const currentItemTop =
    itemRect.top - containerRect.top + scrollContainer.scrollTop
  const targetScroll = Math.max(
    0,
    Math.min(
      currentItemTop - (containerRect.height - itemRect.height) / 2,
      scrollContainer.scrollHeight - scrollContainer.clientHeight
    )
  )

  if (Math.abs(targetScroll - scrollContainer.scrollTop) > 5) {
    scrollContainer.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    })
  }
}

export function updateScrollMask(
  scrollViewport: HTMLElement,
  targetContainer: HTMLElement = scrollViewport,
  options: { topMask?: string; bottomMask?: string; threshold?: number } = {}
) {
  const {
    topMask = "mask-t-from-80%",
    bottomMask = "mask-b-from-80%",
    threshold = 5,
  } = options

  const { scrollTop, scrollHeight, clientHeight } = scrollViewport
  const isAtTop = scrollTop <= threshold
  const isAtBottom = scrollTop >= scrollHeight - clientHeight - threshold

  targetContainer.classList.toggle(topMask, !isAtTop)
  targetContainer.classList.toggle(bottomMask, !isAtBottom)
}
