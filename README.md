
<body>

  <h1>Service Request API</h1>
  <p>A simple backend API for a <strong>Service Request</strong> system where users can authenticate, update their location and online status, and find nearby active service providers.</p>

  <hr />

  <h2>Features</h2>
  <ul>
    <li>User login with phone number and password (JWT authentication)</li>
    <li>Service provider location and online status update</li>
    <li>Fetch list of active nearby service providers based on geographic proximity</li>
  </ul>

  <hr />

  <h2>API Endpoints</h2>

  <h3>1. User Login</h3>
  <p><strong>POST</strong> <code>/api/login</code></p>
  <p><strong>Request body:</strong></p>
  <pre><code>{
  "phone": "09120000000",
  "password": "123456"
}</code></pre>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "token": "JWT_AUTH_TOKEN"
}</code></pre>

  <hr />

  <h3>2. Update Provider Location and Status</h3>
  <p><strong>POST</strong> <code>/api/provider/location/update</code></p>
  <p><strong>Headers:</strong></p>
  <pre><code>Authorization: Bearer &lt;JWT_AUTH_TOKEN&gt;</code></pre>

  <p><strong>Request body:</strong></p>
  <pre><code>{
  "lat": 35.7001,
  "lng": 51.4099,
  "is_online": true
}</code></pre>

  <p><strong>Response:</strong></p>
  <pre><code>{
  "msg": "Location updated",
  "user": {
    "phone": "09120000000",
    "lat": 35.7001,
    "lng": 51.4099,
    "is_online": true
  }
}</code></pre>

  <hr />

  <h3>3. Get Nearby Active Providers</h3>
  <p><strong>GET</strong> <code>/api/providers/nearby?lat=35.7021&lng=51.4031</code></p>

  <p><strong>Response example:</strong></p>
  <pre><code>{
  "status": "success",
  "providers": [
    {
      "id": 12,
      "name": "Ali",
      "lat": 35.7010,
      "lng": 51.4040
    },
    {
      "id": 17,
      "name": "Sara",
      "lat": 35.7002,
      "lng": 51.4050
    }
  ]
}</code></pre>

  <hr />

  <h2>Technologies Used</h2>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB with Mongoose</li>
    <li>JSON Web Tokens (JWT) for authentication</li>
    <li>Socket.io for optional real-time communication (optional task)</li>
  </ul>

  <hr />

  <h2>Setup and Installation</h2>
  <ol>
    <li>Clone the repository:
      <pre><code>git clone &lt;repo-url&gt;
cd &lt;repo-folder&gt;</code></pre>
    </li>
    <li>Install dependencies:
      <pre><code>npm install</code></pre>
    </li>
    <li>Create a <code>.env</code> file based on <code>.env.example</code> with your configuration (MongoDB URI, JWT secret, etc.)</li>
    <li>Start the server:
      <pre><code>npm start</code></pre>
    </li>
  </ol>

  <hr />

  <h2>Notes</h2>
  <ul>
    <li>Authentication middleware protects location update API; include the token in <code>Authorization</code> header.</li>
    <li>Location search uses a simple bounding box based on latitude and longitude deltas.</li>
    <li>Real-time notifications (via WebSocket) are optional and can be implemented for notifying providers about new service requests.</li>
  </ul>

</body>
</html>
