# Database Documentation: Melody Generator

## Overview

This document provides an overview of the Melody Generator database structure, detailing the collections and their data aggregation. The database is used to track user-generated melodies, interactions, and engagement metrics.

## Database: Data-development

### Collections

The database consists of the following collections:

1. posts - Stores public and private posts.
2. prompts - Tracks user input prompts and extracted keywords.
3. sessions - Manages user sessions and conversion rates.
4. shares - Logs melody sharing actions.
5. time - Records the time users spend on the website.

## Collection Details

1. posts

**Purpose:**

Tracks whether a user has posted their melody publicly or privately.

**Schema:**

```
{
  "sessionId": "string",
  "publicPost": "boolean",
  "privatePost": "boolean",
  "timestamp": "Date"
}
```

**Aggregated Data:**

- Total Public Posts: X
- Total Private Posts: Y
- Public vs Private Percentage: XX% / YY%

2. prompts

**Purpose:**

Stores the user-generated text prompts and extracted keywords used to generate melodies.

**Schema:**

```
{
  "sessionId": "string",
  "prompt": "string",
  "keywords": ["string"],
  "timestamp": "Date"
}
```

**Aggregated Data:**

- Total Prompts Submitted: X
- Most Common Keywords: [Keyword1, Keyword2, Keyword3]

3. sessions

**Purpose:**

Manages user session details and tracks whether a user has converted (i.e., generated a melody).

**Schema:**

```
{
  "sessionId": "string",
  "converted": "boolean",
  "timestamp": "Date"
}
```

**Aggregated Data:**

- Total Sessions: X
- Converted Sessions: Y
- Conversion Rate: Z%

4. shares

**Purpose:**

Tracks whether a user has shared their melody.

**Schema:**

```
{
  "sessionId": "string",
  "converted": "boolean",
  "timestamp": "Date"
}
```

**Aggregated Data:**

- Total Shares: X
- Shared vs Not Shared Percentage: XX% / YY%

5. time

**Purpose:**

Logs the total time spent by users on the website.

**Schema:**

```
{
  "sessionId": "string",
  "timeSpent": "number", // in seconds
  "visitDate": "Date"
}
```

**Aggregated Data:**

- Average Time Spent: XX seconds
- Total Time Spent Across Users: YYY seconds

## Insights and Use Cases

- User Engagement: Analyze how much time users spend on the platform and whether they engage with melody generation.
- Content Trends: Identify the most popular prompts and keywords to enhance recommendations.
- Conversion Analysis: Track how many users transition from visiting the site to generating a melody.
- Community Participation: Compare public vs. private posts to understand sharing behavior.

## Future Enhancements

- Implement user authentication for tracking engagement at a user level.
- Store user feedback on generated melodies.
- Enable real-time analytics on user interactions.
