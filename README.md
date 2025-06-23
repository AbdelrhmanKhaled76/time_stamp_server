# Timestamp Microservice
A RESTful API project built for the FreeCodeCamp Backend Development and APIs Certification. Converts dates between Unix timestamps and UTC strings.

Features
Endpoint: GET /api/:date?

Accepts:

Valid date strings (e.g., "2023-05-15")

Unix timestamps (e.g., 1684108800000)

Empty parameter (returns current time)

Returns JSON response with:

unix: Unix timestamp (milliseconds)

utc: Formatted date string (e.g., "Mon, 15 May 2023 00:00:00 GMT")

Handles invalid dates with error response: { error: "Invalid Date" }

Tech Stack
Backend: Node.js + Express
