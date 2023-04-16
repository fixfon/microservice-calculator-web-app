## Percentage Service

This service is used to calculate the percentage of a number.

### Build

```bash
docker build -t percentage-service .
```

### Run

```bash
docker run -d -p 3001:3001 --name percentage-service percentage-service
```

### Test

```bash
POST http://localhost:3001/percentage
Content-Type: application/json

{
    percentage: 10,
}

Expected Response:

{
    "result": 0.1
}
```
