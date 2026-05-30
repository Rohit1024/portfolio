---
title: 'Understanding API Gateway Quotas'
description: 'API Gateway quotas help control costs and manage load.'
date: 2026-05-31
tags: ['gcp', 'api-gateway', 'cloud']
---

API Gateway using OpenApi 2.0 : 

```yaml
swagger: '2.0'
info:
  title: test-api-gateway
  description: Sample API on API Gateway with a Cloud Run backend
  version: 1.0.0
schemes:
  - https
produces:
  - application/json
x-google-backend:
  address: https://some-api.run.app
x-google-management:
  metrics:
    - name: "api-requests"
      displayName: "API Requests"
      valueType: INT64
      metricKind: DELTA
  quota:
    limits:
      - name: "request-limit"
        metric: "api-requests"
        unit: "1/min/{project}"
        values:
          STANDARD: 2
paths:
  /:
    get:
      summary: Cloud Run hello world
      operationId: hello
      x-google-quota:
        metricCosts:
          "api-requests": 1
      responses:
        '200':
          description: A successful response
          schema:
            type: object
            properties:
              status:
                type: string
                example: "ok"
              docs:
                type: string
                example: "/scalar"
      security:
        - api_key: []
securityDefinitions:
  api_key:
    type: apiKey
    name: key
    in: query
```

API Gateway using OpenApi 3.0 : 

```yaml
openapi: 3.0.3
info:
  title: test-api-gateway
  description: Sample API on API Gateway with a Cloud Run backend
  version: 1.0.0
servers:
  - url: /
# Root-level API Management for OpenAPI 3.0 handles backends, metrics, and quotas
x-google-api-management:
  metrics:
    - name: "api-requests"
      displayName: "API Requests"
      valueType: INT64
      metricKind: DELTA
  quota:
    limits:
      - name: "request-limit"
        metric: "api-requests"
        unit: "1/min/{project}"
        values:
          STANDARD: 2
paths:
  /:
    get:
      summary: Cloud Run hello world
      operationId: hello
      x-google-backend:
        address: https://some-api.run.app
      x-google-quota:
        metricCosts:
          "api-requests": 1
      responses:
        '200':
          description: A successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "ok"
                  docs:
                    type: string
                    example: "/scalar"
      security:
        - api_key: []
components:
  securitySchemes:
    api_key:
      type: apiKey
      name: key
      in: query
```