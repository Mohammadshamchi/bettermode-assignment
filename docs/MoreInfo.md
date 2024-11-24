"query replies($after: String, $before: String, $excludePins: Boolean, $limit: Int!, $offset: Int, $orderBy: PostListOrderByEnum, $postId: ID!, $reverse: Boolean) {\n replies(\n after: $after\n before: $before\n excludePins: $excludePins\n limit: $limit\n offset: $offset\n orderBy: $orderBy\n postId: $postId\n reverse: $reverse\n ) {\n totalCount\n pageInfo {\n endCursor\n hasNextPage\n }\n nodes {\n id\n slug\n mappingFields {\n key\n type\n value\n }\n fields {\n key\n value\n relationEntities {\n **typename\n medias {\n **typename\n ... on Emoji {\n **typename\n id\n text\n }\n ... on File {\n **typename\n downloadUrl\n extension\n id\n name\n size\n status\n url\n }\n ... on Image {\n **typename\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n dominantColorHex\n downloadUrl\n dpi\n height\n id\n name\n status\n url\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n width\n }\n }\n members {\n **typename\n bannerId\n blockedMemberIds\n createdAt\n displayName\n email\n emailStatus\n externalId\n externalUrl\n flagged\n id\n lastSeen\n lastSeenAt\n locale\n name\n networkId\n newEmail\n overrideTeammate\n profilePicture {\n **typename\n ... on Image {\n **typename\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n dominantColorHex\n downloadUrl\n dpi\n height\n id\n name\n status\n url\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n width\n }\n }\n profilePictureId\n relativeUrl\n roleId\n score\n staffReasons\n status\n subscribersCount\n tagline\n teammate\n timeZone\n updatedAt\n url\n username\n verifiedAt\n }\n posts {\n **typename\n allowedEmojis\n allowedReactions\n attachmentIds\n createdAt\n createdById\n description\n embedIds\n externalId\n externalUrl\n followersCount\n forbiddenEmojis\n forbiddenReactions\n hasMoreContent\n id\n imageIds\n isAnonymous\n isHidden\n language\n lastActivityAt\n locked\n mentionedMembers\n negativeReactions\n negativeReactionsCount\n networkId\n ownerId\n pinnedInto\n positiveReactions\n positiveReactionsCount\n postTypeId\n primaryReactionType\n publishedAt\n reactionsCount\n relativeUrl\n repliedToId\n repliedToIds\n repliesCount\n shortContent\n singleChoiceReactions\n slug\n spaceId\n status\n subscribersCount\n tagIds\n textContent\n thumbnailId\n title\n topicIds\n totalRepliesCount\n updatedAt\n url\n }\n spaces {\n **typename\n bannerId\n createdAt\n createdById\n customOrderingIndexInGroup\n description\n externalId\n externalUrl\n groupId\n hidden\n highlightedTagIds\n id\n image {\n **typename\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Image {\n **typename\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n dominantColorHex\n downloadUrl\n dpi\n height\n id\n name\n status\n url\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n width\n }\n }\n imageId\n inviteOnly\n isHomepage\n isNewUserHomepage\n isReturningUserHomepage\n key\n layout\n membersCount\n name\n networkId\n nonAdminsCanInvite\n postsCount\n private\n relativeUrl\n slug\n subscribersCount\n type\n updatedAt\n url\n whoCanPost\n whoCanReact\n whoCanReply\n }\n tags {\n **typename\n description\n id\n slug\n spaceId\n title\n }\n }\n }\n subscribersCount\n postTypeId\n reactionsCount\n hasMoreContent\n isAnonymous\n isHidden\n shortContent\n createdAt\n publishedAt\n ownerId\n createdById\n status\n spaceId\n imageIds\n pinnedInto\n repliesCount\n totalRepliesCount\n locked\n repliedToIds\n repliedToId\n title\n description\n thumbnail {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n embedIds\n mentionedMembers\n primaryReactionType\n lastActivityAt\n language\n customSeoDetail {\n description\n noIndex\n thumbnail {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n thumbnailId\n title\n canonicalUrl\n }\n relativeUrl\n url\n attachments {\n extension\n id\n name\n size\n url\n downloadUrl\n }\n authMemberProps {\n context\n scopes\n subscribed\n permissions {\n name\n isAuthorized {\n authorized\n reason\n requiredPlan\n }\n inputPermissions {\n path\n isAuthorized {\n authorized\n reason\n requiredPlan\n }\n }\n outputPermissions {\n path\n isAuthorized {\n authorized\n reason\n requiredPlan\n }\n }\n }\n availableReplyTypes {\n **typename\n archived\n allowedEmojis\n context\n createdAt\n forbiddenEmojis\n id\n languageTemplate\n name\n description\n nativeFieldsTemplates {\n description\n thumbnailId\n title\n }\n negativeReactions\n pluralName\n positiveReactions\n primaryReactionType\n shortContentTemplate\n singleChoiceReactions\n allowedReactions\n customReactions {\n **typename\n activeColor\n activeGlyphId\n activeName\n color\n glyphId\n key\n name\n }\n slug\n titleTemplate\n updatedAt\n mappings {\n key\n field\n type\n title\n description\n required\n isMainContent\n isSearchable\n default\n }\n }\n canReact\n }\n owner {\n **typename\n member {\n displayName\n name\n id\n locale\n profilePictureId\n bannerId\n status\n username\n email\n emailStatus\n newEmail\n tagline\n lastSeenAt\n createdAt\n updatedAt\n relativeUrl\n url\n externalId\n roleId\n flagged\n teammate\n staffReasons\n profilePicture {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n badges {\n backgroundColor\n badgeId\n imageId\n longDescription\n text\n shortDescription\n textColor\n type\n badge {\n active\n backgroundColor\n daysUntilExpired\n id\n imageId\n longDescription\n name\n shortDescription\n textColor\n text\n type\n settings {\n key\n value\n }\n image {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n }\n }\n }\n }\n embeds {\n author\n author_url\n description\n html\n id\n provider_name\n thumbnail_height\n thumbnail_url\n thumbnail_width\n title\n type\n url\n }\n mentions {\n displayName\n name\n id\n locale\n profilePictureId\n bannerId\n status\n username\n email\n emailStatus\n newEmail\n tagline\n lastSeenAt\n createdAt\n updatedAt\n relativeUrl\n url\n externalId\n roleId\n flagged\n teammate\n staffReasons\n }\n reactions {\n count\n reacted\n reaction\n participants(limit: 10) {\n nodes {\n participant {\n id\n name\n }\n }\n }\n }\n replies(limit: 2, reverse: true, orderBy: createdAt) {\n nodes {\n id\n slug\n mappingFields {\n key\n type\n value\n }\n fields {\n key\n value\n relationEntities {\n **typename\n medias {\n **typename\n ... on Emoji {\n **typename\n id\n text\n }\n ... on File {\n **typename\n downloadUrl\n extension\n id\n name\n size\n status\n url\n }\n ... on Image {\n **typename\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n dominantColorHex\n downloadUrl\n dpi\n height\n id\n name\n status\n url\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n width\n }\n }\n members {\n **typename\n bannerId\n blockedMemberIds\n createdAt\n displayName\n email\n emailStatus\n externalId\n externalUrl\n flagged\n id\n lastSeen\n lastSeenAt\n locale\n name\n networkId\n newEmail\n overrideTeammate\n profilePicture {\n **typename\n ... on Image {\n **typename\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n dominantColorHex\n downloadUrl\n dpi\n height\n id\n name\n status\n url\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n width\n }\n }\n profilePictureId\n relativeUrl\n roleId\n score\n staffReasons\n status\n subscribersCount\n tagline\n teammate\n timeZone\n updatedAt\n url\n username\n verifiedAt\n }\n posts {\n **typename\n allowedEmojis\n allowedReactions\n attachmentIds\n createdAt\n createdById\n description\n embedIds\n externalId\n externalUrl\n followersCount\n forbiddenEmojis\n forbiddenReactions\n hasMoreContent\n id\n imageIds\n isAnonymous\n isHidden\n language\n lastActivityAt\n locked\n mentionedMembers\n negativeReactions\n negativeReactionsCount\n networkId\n ownerId\n pinnedInto\n positiveReactions\n positiveReactionsCount\n postTypeId\n primaryReactionType\n publishedAt\n reactionsCount\n relativeUrl\n repliedToId\n repliedToIds\n repliesCount\n shortContent\n singleChoiceReactions\n slug\n spaceId\n status\n subscribersCount\n tagIds\n textContent\n thumbnailId\n title\n topicIds\n totalRepliesCount\n updatedAt\n url\n }\n spaces {\n **typename\n bannerId\n createdAt\n createdById\n customOrderingIndexInGroup\n description\n externalId\n externalUrl\n groupId\n hidden\n highlightedTagIds\n id\n image {\n **typename\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Image {\n **typename\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n dominantColorHex\n downloadUrl\n dpi\n height\n id\n name\n status\n url\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n width\n }\n }\n imageId\n inviteOnly\n isHomepage\n isNewUserHomepage\n isReturningUserHomepage\n key\n layout\n membersCount\n name\n networkId\n nonAdminsCanInvite\n postsCount\n private\n relativeUrl\n slug\n subscribersCount\n type\n updatedAt\n url\n whoCanPost\n whoCanReact\n whoCanReply\n }\n tags {\n **typename\n description\n id\n slug\n spaceId\n title\n }\n }\n }\n subscribersCount\n postTypeId\n reactionsCount\n hasMoreContent\n isAnonymous\n isHidden\n shortContent\n createdAt\n publishedAt\n ownerId\n createdById\n status\n spaceId\n imageIds\n pinnedInto\n repliesCount\n totalRepliesCount\n locked\n repliedToIds\n repliedToId\n title\n description\n thumbnail {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n embedIds\n mentionedMembers\n primaryReactionType\n lastActivityAt\n language\n customSeoDetail {\n description\n noIndex\n thumbnail {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n thumbnailId\n title\n canonicalUrl\n }\n relativeUrl\n url\n attachments {\n extension\n id\n name\n size\n url\n downloadUrl\n }\n authMemberProps {\n context\n scopes\n subscribed\n permissions {\n name\n isAuthorized {\n authorized\n reason\n requiredPlan\n }\n inputPermissions {\n path\n isAuthorized {\n authorized\n reason\n requiredPlan\n }\n }\n outputPermissions {\n path\n isAuthorized {\n authorized\n reason\n requiredPlan\n }\n }\n }\n availableReplyTypes {\n **typename\n archived\n allowedEmojis\n context\n createdAt\n forbiddenEmojis\n id\n languageTemplate\n name\n description\n nativeFieldsTemplates {\n description\n thumbnailId\n title\n }\n negativeReactions\n pluralName\n positiveReactions\n primaryReactionType\n shortContentTemplate\n singleChoiceReactions\n allowedReactions\n customReactions {\n **typename\n activeColor\n activeGlyphId\n activeName\n color\n glyphId\n key\n name\n }\n slug\n titleTemplate\n updatedAt\n mappings {\n key\n field\n type\n title\n description\n required\n isMainContent\n isSearchable\n default\n }\n }\n canReact\n }\n owner {\n **typename\n member {\n displayName\n name\n id\n locale\n profilePictureId\n bannerId\n status\n username\n email\n emailStatus\n newEmail\n tagline\n lastSeenAt\n createdAt\n updatedAt\n relativeUrl\n url\n externalId\n roleId\n flagged\n teammate\n staffReasons\n profilePicture {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n badges {\n backgroundColor\n badgeId\n imageId\n longDescription\n text\n shortDescription\n textColor\n type\n badge {\n active\n backgroundColor\n daysUntilExpired\n id\n imageId\n longDescription\n name\n shortDescription\n textColor\n text\n type\n settings {\n key\n value\n }\n image {\n ... on Image {\n **typename\n id\n url\n width\n height\n dominantColorHex\n dpi\n cropHeight\n cropWidth\n cropX\n cropY\n cropZoom\n urls {\n **typename\n full\n large\n medium\n small\n thumb\n }\n }\n ... on Emoji {\n **typename\n id\n text\n }\n ... on Glyph {\n **typename\n id\n text\n variant\n }\n ... on File {\n id\n name\n url\n }\n }\n }\n }\n }\n }\n embeds {\n author\n author_url\n description\n html\n id\n provider_name\n thumbnail_height\n thumbnail_url\n thumbnail_width\n title\n type\n url\n }\n mentions {\n displayName\n name\n id\n locale\n profilePictureId\n bannerId\n status\n username\n email\n emailStatus\n newEmail\n tagline\n lastSeenAt\n createdAt\n updatedAt\n relativeUrl\n url\n externalId\n roleId\n flagged\n teammate\n staffReasons\n }\n reactions {\n count\n reacted\n reaction\n participants(limit: 10) {\n nodes {\n participant {\n id\n name\n }\n }\n }\n }\n }\n pageInfo {\n endCursor\n hasNextPage\n }\n totalCount\n }\n }\n }\n}\n"

{
"data": {
"replies": {
"totalCount": 0,
"pageInfo": {
"endCursor": "eyJpZCI6IkFvSm9jWmVHcnZvSnNRaiIsIm9yZGVyQnkiOiJlbnRpdHkucHVibGlzaGVkQXQiLCJ2YWx1ZSI6IjIwMjQtMTEtMThUMTA6Mjk6MjAuOTg1WiJ9",
"hasNextPage": false
},
"nodes": [
{
"id": "AoJocZeGrvoJsQj",
"slug": "example-of-comments",
"mappingFields": [
{
"key": "content",
"type": "html",
"value": "\"<p>example of comments </p>\""
},
{
"key": "previewImageId",
"type": "image",
"value": "null"
}
],
"fields": [
{
"key": "content",
"value": "\"<p>example of comments </p>\"",
"relationEntities": null
}
],
"subscribersCount": 1,
"postTypeId": "YZgUv70tONq4oqT",
"reactionsCount": 0,
"hasMoreContent": false,
"isAnonymous": false,
"isHidden": false,
"shortContent": "<p>example of comments </p>",
"createdAt": "2024-11-18T10:29:20.891Z",
"publishedAt": "2024-11-18T10:29:20.985Z",
"ownerId": "x9ZiZZRQ7y",
"createdById": "x9ZiZZRQ7y",
"status": "PUBLISHED",
"spaceId": "TrO8a5bZXIWv",
"imageIds": [],
"pinnedInto": [],
"repliesCount": 0,
"totalRepliesCount": 0,
"locked": false,
"repliedToIds": [
"gXEKYZFxguPYGbk"
],
"repliedToId": "gXEKYZFxguPYGbk",
"title": "example of comments",
"description": "example of comments",
"thumbnail": null,
"embedIds": [],
"mentionedMembers": [],
"primaryReactionType": "EMOJI_BASE",
"lastActivityAt": "2024-11-18T10:29:20.985Z",
"language": "en",
"customSeoDetail": {
"description": null,
"noIndex": null,
"thumbnail": null,
"thumbnailId": null,
"title": null,
"canonicalUrl": null
},
"relativeUrl": "/blog/post/communication-collaboration-coordination-gXEKYZFxguPYGbk?highlight=AoJocZeGrvoJsQj",
"url": "https://devapp-z983h20x.bettermode.io/blog/post/communication-collaboration-coordination-gXEKYZFxguPYGbk?highlight=AoJocZeGrvoJsQj",
"attachments": [],
"authMemberProps": {
"context": "POST",
"scopes": [
"*"
],
"subscribed": true,
"permissions": [
{
"name": "getPostReactionParticipants",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "postReactionParticipants",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "addReaction",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.participantId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "removeReaction",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "participantId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "addReply",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "createReply",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "updatePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": [
{
"path": "isHidden",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
]
},
{
"name": "removePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "deletePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "getPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "post",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "pinReplyToPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "unpinReplyFromPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "hidePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "unhidePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "getReplies",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "replies",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
}
],
"availableReplyTypes": [
{
"**typename": "PostType",
"archived": false,
"allowedEmojis": null,
"context": "reply",
"createdAt": "2024-11-13T14:26:46.915Z",
"forbiddenEmojis": null,
"id": "YZgUv70tONq4oqT",
"languageTemplate": "language(content)",
"name": "Comment",
"description": null,
"nativeFieldsTemplates": {
"description": "{{ fields.content | parseHTMLAndTruncate: 200 }}",
"thumbnailId": "{{ imageIds | first }}",
"title": "{{ fields.content | parseHTMLAndTruncate: 80}}"
},
"negativeReactions": null,
"pluralName": "Comments",
"positiveReactions": null,
"primaryReactionType": "EMOJI_BASE",
"shortContentTemplate": "truncate(content, 200)",
"singleChoiceReactions": null,
"allowedReactions": null,
"customReactions": [],
"slug": "comment",
"titleTemplate": null,
"updatedAt": "2024-11-13T14:26:46.915Z",
"mappings": [
{
"key": "content",
"field": "html1",
"type": "html",
"title": "Content",
"description": "The Body of comment",
"required": true,
"isMainContent": true,
"isSearchable": true,
"default": null
},
{
"key": "previewImageId",
"field": "image1",
"type": "image",
"title": "Preview Image",
"description": "Preview image of comment",
"required": null,
"isMainContent": null,
"isSearchable": null,
"default": null
}
]
}
],
"canReact": true
},
"owner": {
"**typename": "SpaceMember",
"member": {
"displayName": null,
"name": "Mohammad Shamchi Rezaeiyeh",
"id": "x9ZiZZRQ7y",
"locale": "en-US",
"profilePictureId": "",
"bannerId": null,
"status": "VERIFIED",
"username": "x9ZiZZRQ7y",
"email": "shamchimohammad@gmail.com",
"emailStatus": "verified",
"newEmail": null,
"tagline": null,
"lastSeenAt": "2024-11-18T10:28:58.678Z",
"createdAt": "2024-11-13T14:26:46.244Z",
"updatedAt": "2024-11-13T14:26:46.244Z",
"relativeUrl": "/member/x9ZiZZRQ7y",
"url": "https://devapp-z983h20x.bettermode.io/member/x9ZiZZRQ7y",
"externalId": null,
"roleId": "DMvxuyIoF9",
"flagged": false,
"teammate": true,
"staffReasons": [
"NetworkStaffRole"
],
"profilePicture": null,
"badges": []
}
},
"embeds": null,
"mentions": [],
"reactions": [],
"replies": null
}
]
}
},
"extensions": {
"complexity": 35662
}
}

{
"data": {
"replies": {
"totalCount": 1,
"pageInfo": {
"endCursor": "eyJpZCI6IkFvSm9jWmVHcnZvSnNRaiIsIm9yZGVyQnkiOiJlbnRpdHkucHVibGlzaGVkQXQiLCJ2YWx1ZSI6IjIwMjQtMTEtMThUMTA6Mjk6MjAuOTg1WiJ9",
"hasNextPage": false
},
"nodes": [
{
"id": "AoJocZeGrvoJsQj",
"slug": "example-of-comments",
"mappingFields": [
{
"key": "content",
"type": "html",
"value": "\"<p>example of comments </p>\""
},
{
"key": "previewImageId",
"type": "image",
"value": "null"
}
],
"fields": [
{
"key": "content",
"value": "\"<p>example of comments </p>\"",
"relationEntities": null
}
],
"subscribersCount": 1,
"postTypeId": "YZgUv70tONq4oqT",
"reactionsCount": 0,
"hasMoreContent": false,
"isAnonymous": false,
"isHidden": false,
"shortContent": "<p>example of comments </p>",
"createdAt": "2024-11-18T10:29:20.891Z",
"publishedAt": "2024-11-18T10:29:20.985Z",
"ownerId": "x9ZiZZRQ7y",
"createdById": "x9ZiZZRQ7y",
"status": "PUBLISHED",
"spaceId": "TrO8a5bZXIWv",
"imageIds": [],
"pinnedInto": [],
"repliesCount": 1,
"totalRepliesCount": 1,
"locked": false,
"repliedToIds": [
"gXEKYZFxguPYGbk"
],
"repliedToId": "gXEKYZFxguPYGbk",
"title": "example of comments",
"description": "example of comments",
"thumbnail": null,
"embedIds": [],
"mentionedMembers": [],
"primaryReactionType": "EMOJI_BASE",
"lastActivityAt": "2024-11-18T10:34:09.355Z",
"language": "en",
"customSeoDetail": {
"description": null,
"noIndex": null,
"thumbnail": null,
"thumbnailId": null,
"title": null,
"canonicalUrl": null
},
"relativeUrl": "/blog/post/communication-collaboration-coordination-gXEKYZFxguPYGbk?highlight=AoJocZeGrvoJsQj",
"url": "https://devapp-z983h20x.bettermode.io/blog/post/communication-collaboration-coordination-gXEKYZFxguPYGbk?highlight=AoJocZeGrvoJsQj",
"attachments": [],
"authMemberProps": {
"context": "POST",
"scopes": [
"*"
],
"subscribed": true,
"permissions": [
{
"name": "getPostReactionParticipants",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "postReactionParticipants",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "addReaction",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.participantId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "removeReaction",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "participantId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "addReply",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "createReply",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "updatePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": [
{
"path": "isHidden",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
]
},
{
"name": "removePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "deletePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "getPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "post",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "pinReplyToPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "unpinReplyFromPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "hidePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "unhidePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "getReplies",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "replies",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
}
],
"availableReplyTypes": [
{
"**typename": "PostType",
"archived": false,
"allowedEmojis": null,
"context": "reply",
"createdAt": "2024-11-13T14:26:46.915Z",
"forbiddenEmojis": null,
"id": "YZgUv70tONq4oqT",
"languageTemplate": "language(content)",
"name": "Comment",
"description": null,
"nativeFieldsTemplates": {
"description": "{{ fields.content | parseHTMLAndTruncate: 200 }}",
"thumbnailId": "{{ imageIds | first }}",
"title": "{{ fields.content | parseHTMLAndTruncate: 80}}"
},
"negativeReactions": null,
"pluralName": "Comments",
"positiveReactions": null,
"primaryReactionType": "EMOJI_BASE",
"shortContentTemplate": "truncate(content, 200)",
"singleChoiceReactions": null,
"allowedReactions": null,
"customReactions": [],
"slug": "comment",
"titleTemplate": null,
"updatedAt": "2024-11-13T14:26:46.915Z",
"mappings": [
{
"key": "content",
"field": "html1",
"type": "html",
"title": "Content",
"description": "The Body of comment",
"required": true,
"isMainContent": true,
"isSearchable": true,
"default": null
},
{
"key": "previewImageId",
"field": "image1",
"type": "image",
"title": "Preview Image",
"description": "Preview image of comment",
"required": null,
"isMainContent": null,
"isSearchable": null,
"default": null
}
]
}
],
"canReact": true
},
"owner": {
"**typename": "SpaceMember",
"member": {
"displayName": null,
"name": "Mohammad Shamchi Rezaeiyeh",
"id": "x9ZiZZRQ7y",
"locale": "en-US",
"profilePictureId": "",
"bannerId": null,
"status": "VERIFIED",
"username": "x9ZiZZRQ7y",
"email": "shamchimohammad@gmail.com",
"emailStatus": "verified",
"newEmail": null,
"tagline": null,
"lastSeenAt": "2024-11-18T10:34:09.240Z",
"createdAt": "2024-11-13T14:26:46.244Z",
"updatedAt": "2024-11-13T14:26:46.244Z",
"relativeUrl": "/member/x9ZiZZRQ7y",
"url": "https://devapp-z983h20x.bettermode.io/member/x9ZiZZRQ7y",
"externalId": null,
"roleId": "DMvxuyIoF9",
"flagged": false,
"teammate": true,
"staffReasons": [
"NetworkStaffRole"
],
"profilePicture": null,
"badges": []
}
},
"embeds": null,
"mentions": [],
"reactions": [],
"replies": {
"nodes": [
{
"id": "hcyhAXuyHSLqpDw",
"slug": "new-comment-reply-to-comment",
"mappingFields": [
{
"key": "content",
"type": "html",
"value": "\"<p>new-comment-reply-to-comment</p>\""
},
{
"key": "previewImageId",
"type": "image",
"value": "null"
}
],
"fields": [
{
"key": "content",
"value": "\"<p>new-comment-reply-to-comment</p>\"",
"relationEntities": null
}
],
"subscribersCount": 1,
"postTypeId": "YZgUv70tONq4oqT",
"reactionsCount": 0,
"hasMoreContent": false,
"isAnonymous": false,
"isHidden": false,
"shortContent": "<p>new-comment-reply-to-comment</p>",
"createdAt": "2024-11-18T10:34:09.268Z",
"publishedAt": "2024-11-18T10:34:09.355Z",
"ownerId": "x9ZiZZRQ7y",
"createdById": "x9ZiZZRQ7y",
"status": "PUBLISHED",
"spaceId": "TrO8a5bZXIWv",
"imageIds": [],
"pinnedInto": [],
"repliesCount": 0,
"totalRepliesCount": 0,
"locked": false,
"repliedToIds": [
"AoJocZeGrvoJsQj",
"gXEKYZFxguPYGbk"
],
"repliedToId": "AoJocZeGrvoJsQj",
"title": "new-comment-reply-to-comment",
"description": "new-comment-reply-to-comment",
"thumbnail": null,
"embedIds": [],
"mentionedMembers": [],
"primaryReactionType": "EMOJI_BASE",
"lastActivityAt": "2024-11-18T10:34:09.355Z",
"language": "en",
"customSeoDetail": {
"description": null,
"noIndex": null,
"thumbnail": null,
"thumbnailId": null,
"title": null,
"canonicalUrl": null
},
"relativeUrl": "/blog/post/communication-collaboration-coordination-gXEKYZFxguPYGbk?highlight=hcyhAXuyHSLqpDw",
"url": "https://devapp-z983h20x.bettermode.io/blog/post/communication-collaboration-coordination-gXEKYZFxguPYGbk?highlight=hcyhAXuyHSLqpDw",
"attachments": [],
"authMemberProps": {
"context": "POST",
"scopes": [
"*"
],
"subscribed": true,
"permissions": [
{
"name": "getPostReactionParticipants",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "postReactionParticipants",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "addReaction",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.participantId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "removeReaction",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "participantId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "addReply",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "createReply",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": []
},
{
"name": "updatePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [
{
"path": "input.createdAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.updatedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.publishedAt",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.externalUrl",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.ownerId",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.locked",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.slug",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
},
{
"path": "input.customSeoDetail",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
],
"outputPermissions": [
{
"path": "isHidden",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
}
}
]
},
{
"name": "removePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "deletePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "getPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "post",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "pinReplyToPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "unpinReplyFromPost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "hidePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "unhidePost",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "getReplies",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
},
{
"name": "replies",
"isAuthorized": {
"authorized": true,
"reason": null,
"requiredPlan": null
},
"inputPermissions": [],
"outputPermissions": []
}
],
"availableReplyTypes": [
{
"**typename": "PostType",
"archived": false,
"allowedEmojis": null,
"context": "reply",
"createdAt": "2024-11-13T14:26:46.915Z",
"forbiddenEmojis": null,
"id": "YZgUv70tONq4oqT",
"languageTemplate": "language(content)",
"name": "Comment",
"description": null,
"nativeFieldsTemplates": {
"description": "{{ fields.content | parseHTMLAndTruncate: 200 }}",
"thumbnailId": "{{ imageIds | first }}",
"title": "{{ fields.content | parseHTMLAndTruncate: 80}}"
},
"negativeReactions": null,
"pluralName": "Comments",
"positiveReactions": null,
"primaryReactionType": "EMOJI_BASE",
"shortContentTemplate": "truncate(content, 200)",
"singleChoiceReactions": null,
"allowedReactions": null,
"customReactions": [],
"slug": "comment",
"titleTemplate": null,
"updatedAt": "2024-11-13T14:26:46.915Z",
"mappings": [
{
"key": "content",
"field": "html1",
"type": "html",
"title": "Content",
"description": "The Body of comment",
"required": true,
"isMainContent": true,
"isSearchable": true,
"default": null
},
{
"key": "previewImageId",
"field": "image1",
"type": "image",
"title": "Preview Image",
"description": "Preview image of comment",
"required": null,
"isMainContent": null,
"isSearchable": null,
"default": null
}
]
}
],
"canReact": true
},
"owner": {
"**typename": "SpaceMember",
"member": {
"displayName": null,
"name": "Mohammad Shamchi Rezaeiyeh",
"id": "x9ZiZZRQ7y",
"locale": "en-US",
"profilePictureId": "",
"bannerId": null,
"status": "VERIFIED",
"username": "x9ZiZZRQ7y",
"email": "shamchimohammad@gmail.com",
"emailStatus": "verified",
"newEmail": null,
"tagline": null,
"lastSeenAt": "2024-11-18T10:34:09.240Z",
"createdAt": "2024-11-13T14:26:46.244Z",
"updatedAt": "2024-11-13T14:26:46.244Z",
"relativeUrl": "/member/x9ZiZZRQ7y",
"url": "https://devapp-z983h20x.bettermode.io/member/x9ZiZZRQ7y",
"externalId": null,
"roleId": "DMvxuyIoF9",
"flagged": false,
"teammate": true,
"staffReasons": [
"NetworkStaffRole"
],
"profilePicture": null,
"badges": []
}
},
"embeds": null,
"mentions": [],
"reactions": []
}
],
"pageInfo": {
"endCursor": "eyJpZCI6ImhjeWhBWHV5SFNMcXBEdyIsIm9yZGVyQnkiOiJlbnRpdHkuY3JlYXRlZEF0IiwidmFsdWUiOiIyMDI0LTExLTE4VDEwOjM0OjA5LjI2OFoifQ==",
"hasNextPage": false
},
"totalCount": 1
}
}
]
}
},
"extensions": {
"complexity": 35662
}
}
