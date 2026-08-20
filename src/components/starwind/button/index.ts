import Button from "./Button.astro"
import { button } from "./variants"

const ButtonVariants = {
  button,
}

const buttonVariants = button

const ButtonParts = {
  Root: Button,
}

export { Button, ButtonVariants, button, buttonVariants }

export default ButtonParts
