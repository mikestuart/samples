# Mining Product Hunt
This is part of the Mining Product Hunt blog series.

### Acquiring and exploring the database
Get database from [here](https://algorithmia.com/v1/data/ANaimi/ProductHunt/producthunt.db) (requires sign-in). Place the database in the db-wrapper folder and run 'ruby console.rb'. Now you can run typical active record queries:
```
Post.count
Comment.count
User.count
Vote.count
Post.first.comments.count
Post.first.votes.count
User.first.did_vote(Post.first)
```

### Web Demos ###
An Aerobatic app placed in the web-demo folder.

### Chrome Extension ###
Placed in the chrome-extension folder.