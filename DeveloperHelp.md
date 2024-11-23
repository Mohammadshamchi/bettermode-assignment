Getting Started
What is GraphQL?
GraphQL is a query language and a runtime system. Clients form requests (called queries and mutations) by using the GraphQL query language, and the GraphQL server executes the request and returns the data in a response. Unlike REST APIs, which expose a different endpoint for each resource object, a GraphQL API makes all data available at a single endpoint. A client specifies exactly the data that it wants, and the server responds with only that data.

GraphQL looks similar to JSON. The following example shows a simple GraphQL query and the JSON response:

query {
member(username: "admin") {
id
name
username
tagline
}
}

JSON Response

{
"data": {
"member": {
"id": "2KONsPORsA",
"name": "Siavash",
"username": "admin",
"tagline": "CEO at Bettermode"
}
}
}

GraphQL Endpoint
All GraphQL requests should be sent as a POST request to the following address for the US region (us-east-1):

https://api.bettermode.com

You can access Bettermode's GraphQL playground from the same address as well.

info
If your community is in the EU region (eu-central-1), you should use the following GraphQL endpoint instead:

https://api.bettermode.de

The GraphQL API playground for the EU region is available here.

note
All requests to Bettermode's GraphQL endpoint should be authenticated using App Access Token or Member Access Token.

App
An app access token allows app developers to perform actions on behalf of a bot account or a specific member in the community using Bettermode API. Bot accounts can perform all actions that a community admin can perform.

In order to generate app access token, first you should create an app.

note
Don't have an app yet? Follow the instructions here.

Generating access token
note
You can only generate and use app access token on communities that the app is published AND installed on. If the app is not installed in the community the following requests will result in Forbidden response.

You can generate an app access token using the following GraphQL query and basic HTTP authentication:

query {
limitedToken(
context:NETWORK,
networkId: "{networkId}",
entityId: "{networkId}",
impersonateMemberId: "{memberId}"
) {
accessToken
}
}

You should replace {networkId} with your community ID and {memberId} with the ID of the member that you want to perform API requests on behalf of. {clientId} and {clientSecret} in the POST request should be replaced with your App's client ID and client secret as well.

note
Not providing impersonateMemberId will will generate access token for a bot account.

A request with real values will look like:

query {
limitedToken(
context:NETWORK,
networkId: "CAx1mZ7I7a",
entityId: "CAx1mZ7I7a",
impersonateMemberId: "Dm12KzW34"
) {
accessToken
}
}

If your HTTP client doesn't support basic authentication using POST https://api.bettermode.com method, then you can provide the credentials in the Authorization header field instead:

Join the client ID and client secret with a single colon (:).

Encode the resulting string in base64 representation.

Prepend the base64-encoded string with Basic and a space and send it as the Authorization header:

Authorization: Basic YjkzZmE0NTItYTQ5ZGU5NTNlYTEwOmY3YTE0ZjFhN2ExN2E3ZTVmNzE3MjM4YWM2NDY4Zjdl

info
If your community is in the EU region (eu-central-1), you should use the EU graphql endpoint. Read more.

Using the generated access token
The limitedToken query results in the following response:

{
"data": {
"limitedToken": {
"accessToken": "..."
}
}
}

You should pass the provided accessToken in all GraphQL requests in the header as followed:

Authorization: Bearer {accessToken}

Member
A member access token allows member to perform actions on the community. This is useful especially when you are developing a client side application such as a mobile app and you want to login a member with their username and password.

note
All request to Bettermode's GraphQL endpoint except for tokens query should be authenticated.

Guest
If you want to authenticate as a guest or as a member using their email (or username) and password, the most common way is to use the tokens query. Here is a sample query:

query {
tokens(networkDomain: "community.bettermode.io") {
accessToken
role {
name
scopes
}
member {
id
name
}
}
}

You should replace the networkDomain value to your own community address. The result of the above query will be a guest access token as followed:

{
"data": {
"tokens": {
"accessToken": "eyJhbGciOiJIUzI1NiI...",
"role": {
"name": "Guest",
"scopes": [
"network:login",
"network:view",
"role:view",
"member:view:all",
"member:verify",
"network:join",
"network:join:withToken",
"network:join:withLink"
]
},
"member": {
"id": "GUEST_NtT0FkLxxiNH2Ji",
"name": "Guest"
}
}
}
}

You should pass the provided accessToken in all GraphQL requests in the header as followed:

Authorization: Bearer {accessToken}

With a guest access token you have a read only access to all resources available to non-logged in members.

Registered member
To retrieve a user access token you should use the guest access token to send a request to loginNetwork query.

mutation {
loginNetwork(
input: { usernameOrEmail: "bettermodeuser", password: "bettermodepassword" }
) {
accessToken
role {
name
scopes
}
member {
id
name
}
}
}

note
The loginNetwork does not work without passing a guest access token in the header and will result in Unauthorized error message.

The result of the above query will be a user access token as followed:

{
"data": {
"loginNetwork": {
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cC...",
"role": {
"name": "Admin",
"scopes": ["*"]
},
"member": {
"id": "9FWKl7Y1rB",
"name": "John Smith"
}
}
}
}

Similar to guest access tokens you will be able to use the user access token by passing it in the header as followed:

Authorization: Bearer {accessToken}

Making Queries
A GraphQL query retrieves data from a server, similar to a GET request for a REST API. However, unlike REST, all GraphQL queries are sent to a single endpoint and use the POST http method.

A list of all queries available on Bettermode's GraphQL API is available here under Queries section.

note
All requests to Bettermode's GraphQL endpoint should be authenticated using App Access Token or Member Access Token.

Sample Query
This query requests a space object, a few fields, and its members in a single request.

query {
space(slug: "general") {
id
name
members(limit: 1) {
edges {
node {
member {
id
name
}
}
}
totalCount
}
}
}

JSON response

{
"data": {
"space": {
"id": "Y4umRdAkY1aB",
"name": "General",
"members": {
"edges": [
{
"node": {
"member": {
"id": "2KONsPOR1z",
"name": "Siavash"
}
}
}
],
"totalCount": 4
}
}
}
}

Notice that after the data key, the shape of the response keys reflects the shape of the query keys.

info
If your community is hosted on a region other than the US region (us-east-1), you should use a different GraphQL URL as stated here under the GraphQL Endpoint section.

Arguments and Fields
Queries can take arguments to fetch a specific object or filter list of objects.

As an example, the member queries a single member. In the GraphQL API reference, the member query takes id or username as an argument.

The id or username specifies the member to query. After selecting the Member, you list the fields on the Member object that you want to return.

This query gets a specific member, and selects a few fields from that object.

query {
member(username: "admin") {
id
name
username
tagline
}
}

JSON Response

{
"data": {
"member": {
"id": "2KONsPORsA",
"name": "Siavash",
"username": "admin",
"tagline": "CEO at Bettermode"
}
}
}

Connections
Connections are links between related objects. You can use connections to make nested queries, gathering information from multiple objects by traversing their connections in a single GraphQL call. If you're selecting something with a pluralized name, then you're often (but not always) using a connection.

When selecting a connection, you must provide a limit argument. This limits how many results are returned, and is a key component in managing rate-limiting and pagination. These subjects are covered later in this guide.

Within a connection, you need to select the edges field. The edges field returns an array of objects of the same type, such as member's joined spaces. After you’ve selected the edges, you need to access the individual objects by using the node field.

Similar to querying an individual node, you list the fields that you want to return. The response returns that data for each node in the connection. If a connection has fewer than the requested number of objects, then the response contains all the data that's available.

The following example requests a list of first 3 members and the first space they're part of using members query and spaces connection.

query {
members(limit: 3) {
edges {
node {
id
name
spaces(limit: 1) {
edges {
node {
id
name
}
}
totalCount
}
}
}
totalCount
}
}

JSON Response

{
"data": {
"members": {
"edges": [
{
"node": {
"id": "I7Gvba5RaZ",
"name": "Siavash",
"spaces": {
"edges": [
{
"node": {
"id": "Y4umRdAkY11S",
"name": "General"
}
}
]
}
}
}
]
}
}
}

note
In the example response, you can see that the community only has a single member because only one set of data was returned.

Mutations
GraphQL mutations create and modify objects, similar to a PUT, POST, or DELETE request in REST. Mutation requests are sent to the same endpoint as query requests.

A list of all mutations available on Bettermode's GraphQL API is available here under Mutations section.

note
All requests to Bettermode's GraphQL endpoint should be authenticated using App Access Token or Member Access Token.

Mutations Structure
Mutations have the following structure:

The mutation operation name
The mutation field name, such as addSpace
The input data to use in the mutation passed as an argument, such as the information for a new space
A selection of return fields that should be included in the response, such as the ID of the successfully created Space object
Mutation Structure

mutation {
mutationName(arg: "Data") { # return fields
}
}

info
If your community is hosted on a region other than the US region (us-east-1), you should use a different GraphQL URL as stated here under the GraphQL Endpoint section.

Input objects
Mutations require input data, such as the data to create a new object, or the ID of an object to delete. For mutations that might require a substantial data object, the schema provides a dedicated input object type.

For example, the createSpace mutation requires an input argument, which accepts a CreateSpaceInput object. The CreateSpaceInput type defines all the fields that can be used to create or modify a space.

mutation {
createSpace(
input: {
name: "Product Updates"
collectionId: "p15Q7zycbml0"
}
) { # ...
}
}

note
We will cover what collectionId id later in this guide.

Return fields
Each mutation provides a set of fields that can be returned in the response. For example, one of the return fields available for the createSpace mutation is the Space object that was created by a successful mutation. Similar to a GraphQL query, you can select the fields on the new object that you want to include in the response.

mutation {
createSpace(input: { # ...
}) {
id
name
slug
}
}

Create a space
The following mutation uses input objects and return fields to create a new space and return their ID, name, and slug.

mutation {
createSpace(
input: {
name: "Product Updates"
collectionId: "p15Q7zycbml0"
}
) {
id
name
slug
}
}

JSON Response

{
"data": {
"createSpace": {
"id": "qgmFho8F6jlA",
"name": "Product Updates",
"slug": "product-updates-fw15x39k"
}
}
}

Variables
You can simplify GraphQL queries and mutations by extracting data into separate variables. GraphQL variables let you re-use the same requests with different arguments.

Variable Structure
GraphQL requests can be split into two sections: the query, and variables.

In the query section, GraphQL variables begin with the $ symbol and are declared after the query or mutation keyword, similar to passing an argument to a function.

When you declare a variable, you need to specify its type, such as CreateSpaceInput. This lets GraphQL know that you intend to refer to this type by this variable name later in the actual query.

The following query declares an $input variable and passes it to the input argument.

mutation($input: CreateSpaceInput!) {
createSpace(input: $input) { ... }
}

In the variables section, the variables themselves are defined as a JSON object.

The following JSON object defines the $input variable for the query above.

{
"input": {
"name": "Product Updates",
"collectionId": "p15Q7zycbml0"
}
}

Simplify Space Creation Request
The following example uses the createSpace mutation from the previous article, but simplifies the mutation by using variables. The result is a much cleaner and reusable mutation.

mutation ($input: AddSpaceInput!) {
createSpace(input: $input) {
id
name
slug
}
}

Variables

{
"input": {
"name": "Product Updates",
"collectionId": "p15Q7zycbml0"
}
}

JSON Response

{
"data": {
"createSpace": {
"id": "qgmFho8F6jlA",
"name": "Product Updates",
"slug": "product-updates-fw15x39k"
}
}
}

info
If your community is hosted on a region other than the US region (us-east-1), you should use a different GraphQL URL as stated here under the GraphQL Endpoint section.

Variables in cURL
Because variables are a core concept of GraphQL, you can use them outside of fully featured clients. For example, you can perform the addSpace mutation with variables by using cURL.

The cURL command below creates a space. The JSON data object has two properties:

query: The mutation, provided as a string.
variables: An object for holding variables. The only variable is the input object that's used for the mutation.
To run the cURL command from the command line, make the following substitution:

{{access_token}}: Your access token issued as mentioned in the Authentication section
curl -X POST \
https://api.bettermode.com \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {{access_token}}' \
-d '{
"query": "mutation ($input: CreateSpaceInput!) { createSpace(input: $input) { id, name, slug } }",
"variables": {
"input": {
"name": "Product Updates",
"collectionId": "p15Q7zycbml0"
}
}
}'

The response will look similar to this:

{
"data": {
"createSpace": {
"id": "qgmFho8F6jlA",
"name": "Product Updates",
"slug": "product-updates-fw15x39k"
}
}
}

Create Post
createPost mutation is used to create a new post in a space. It takes spaceId and CreatePostInput as inputs.

Each post has a type which defines the fields of it. You can use postTypes query to retrieve the available post types in your community.

postTypes(limit: 10) {
nodes {
id
name
mappings {
key
type
required
}
}
}

mapping field in postType defines the fields of the posts with this type. It is an array of PostTypeMapping. The important attributes of it are key, type, and required.

key: the name of this field used to identify it
type: the type of this field can be one of PostMappingTypeEnum
required: indicate whether this field is required when creating a post
An example of a postType can be:

{
"id": "YP4thX1J1SMMsuw",
"name": "Discussion",
"mappings": [
{
"key": "title",
"type": "text",
"required": null
},
{
"key": "content",
"type": "html",
"required": true
},
{
"key": "previewImageId",
"type": "image",
"required": null
}
]
}

This is the post type for discussion. It has 2 required fields, title and content. title should have a text value but content can contain html. It also has a non-required field, previewImageId, whose type is image.

Create a post
To create a post you need to define its post type. We will use the discussion post type mentioned above. The value of the fields (i.e. title and content) is passed in the mappingFields. The value should be a valid stringified json object. Typically, in JS you can use JSON.stringify().

mutation {
createPost(
spaceId: "0CXG3DhjnlRZ",
input: {
postTypeId: "YP4thX1J1SMMsuw"
mappingFields: [
{
key: "title"
type: text
value: "\"Get started by introducing yourself in the Community\""
},
{
key: "content"
type: html
value: "\"<p>Introduce yourself, spark connections and conversation, and welcome other Bettermode Campfire Community members as we continue to grow.</p>\""
}
]
publish: true
}
) {
id
}
}

Reply to Post
createReply mutation is used to reply to a post. It takes postId and CreatePostInput as inputs.

For example, we can reply with a comment on the post we created above. The post type of comment is this.

{
"id": "XSaq81Sedx2pe4R",
"name": "Comment",
"mappings": [
{
"key": "content",
"type": "html",
"required": true
},
{
"key": "previewImageId",
"type": "image",
"required": null
}
]
}

Now we can create a reply using this post type.

mutation {
createReply(postId: "3ReqMxgxaF9YXPQ", input: {
postTypeId: "XSaq81Sedx2pe4R",
mappingFields: [
{
key: "content"
type: html
value: "\"<p>Hello! I'm Siavash, CEO at Bettermode.</p>\""
}
]
publish: true
}) {
id
}
}

Pin a Reply to Post
pinReplyToPost mutation is used to pin a reply to a post. It takes postId and replyId as inputs.

mutation {
pinReplyToPost(postId: "3ReqMxgxaF9YXPQ", replyId: "OMEm3CiW3Ycddp7") {
status
}
}

When a reply is pinned to a post it will update the pinnedInto in the post query, and also pinnedReplies returns all the replies that to a certain post.

note
One of the use cases for pinnedReplies is to show best answer or highlight a reply to specific post. At the moment, only one reply can be pinned into specific post.

Unpin a Reply from Post
unpinReplyFromPost mutation is used to unpin a reply from a post. It takes postId and replyId as inputs.

mutation {
unpinReplyFromPost(postId: "3ReqMxgxaF9YXPQ", replyId: "OMEm3CiW3Ycddp7") {
status
}
}

Create Post with Attachments
To create a post with attachments you have to first upload the attachments using upload files. Then you can pass the ids of the files as attachmentIds.

mutation {
createPost(
spaceId: "0CXG3DhjnlRZ",
input: {
postTypeId: "XSaq81Sedx2pe4R"
mappingFields: [
{
key: "content"
type: html
value: "\"<p>This is the content</p>\""
}
]
publish: true
attachmentIds: ["GFfd6sdfgG", "Zn92Jdofd"]
}
) {
id
}
}

Create Post with Embedded Image
To embed images in the post first you need to upload images. Then you can use the mediaUrl and mediaId of the uploaded images to create the html element below and embed it in the content of the post.

<figure data-type="image">
    <img src="{mediaUrl}" data-id="{mediaId}">
</figure>

Then the final code to create the post will be similar to this.

note
Don't forget that you have to use JSON.stringify() for the value field.

mutation {
createPost(
spaceId: "0CXG3DhjnlRZ",
input: {
postTypeId: "XSaq81Sedx2pe4R"
mappingFields: [
{
key: "content"
type: html
value: "\"<figure data-type=\\\"image\\\"><img src=\\\"https://tribe-development.imgix.net/h1hx1o8Uu0xilwf2Vqhp6?w=1000&amp;auto=compress,format&amp;dl\\\" data-id=\\\"h1hx1o8Uu0xilwf2Vqhp6\\\"></figure>\""
}
]
publish: true
}
) {
id
}
}

Create Post with Embedded Video(s)
To embed videos in the post first you need to upload them. Then you can use the mediaUrl and mediaId of the uploaded images to create the html element below and embed it in the content of the post.

<video src="{mediaUrl}" data-id="{mediaId}">
    Your browser does not support the video element.
</video>

Then the final code to create the post will be similar to this.

note
Don't forget that you have to use JSON.stringify() for the value field.

mutation {
createPost(
spaceId: "0CXG3DhjnlRZ",
input: {
postTypeId: "XSaq81Sedx2pe4R"
mappingFields: [
{
key: "content"
type: html
value: "\"<video data-id=\\\"6FZXyWeJuymo4olaTOgyp\\\" controls=\\\"true\\\" src=\\\"https://files.dev.t-cdn.net/files/6FZXyWeJuymo4olaTOgyp\\\">Your browser does not support the video element.</video>\""
}
]
publish: true
}
) {
id
}
}

Similarly, you can use the same approach to embed anything else (e.g. audio) to the posts.

Create Post with Embedded Links
You can embed links in the post, for example, a YouTube video. To do so you have to first use embed query and provide the link you want to embed. Then you can create the html below with the id and url of the embed and embed it in the content of the post.

<div data-type="embed" data-id="{embed.id}" data-embed-url="{embed.url}">
</div>

Then the final code to create the post will be similar to this.

note
Don't forget that you have to use JSON.stringify() for the value field.

mutation {
createPost(
spaceId: "0CXG3DhjnlRZ",
input: {
postTypeId: "XSaq81Sedx2pe4R"
mappingFields: [
{
key: "content"
type: html
value: "\"<div data-type=\\\"embed\\\" data-id=\\\"BCvHaomcZ1pFYU2xd0MG3\\\" data-embed-url=\\\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\\\"></div>\""
}
]
publish: true
}
) {
id
}
}
