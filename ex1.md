When webhook receive or fetch a JSON like downbelow
```JSON
{
    "post_id": 1234,
    "post": {
        "ID": 1,
        "post_author": "1",
        "post_date": "2018-11-06 14:19:18",
        "post_date_gmt": "2018-11-06 14:19:18",
        "post_content": "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!",
        "post_title": "Hello world!",
        "post_excerpt": "",
        "post_status": "publish",
        "comment_status": "open",
        "ping_status": "open",
        "post_password": "",
        "post_name": "hello-world",
        "to_ping": "",
        "pinged": "",
        "post_modified": "2018-11-06 14:19:18",
        "post_modified_gmt": "2018-11-06 14:19:18",
        "post_content_filtered": "",
        "post_parent": 0,
        "guid": "https:\/\/mydomain.dev\/?p=1",
        "menu_order": 0,
        "post_type": "post",
        "post_mime_type": "",
        "comment_count": "1",
        "filter": "raw"
    },
    "post_meta": {
        "key_0": [
            "0.00"
        ],
        "key_1": [
            "0"
        ],
        "key_2": [
            "1"
        ],
        "key_3": [
            "148724528:1"
        ],
        "key_4": [
            "10.00"
        ],
        "key_5": [
            "a:0:{}"
        ]
    },
    "post_thumbnail": "https:\/\/mydomain.com\/images\/image.jpg",
    "post_permalink": "https:\/\/mydomain.com\/the-post\/permalink",
    "taxonomies": {
        "category": {
            "uncategorized": {
                "term_id": 1,
                "name": "Uncategorized",
                "slug": "uncategorized",
                "term_group": 0,
                "term_taxonomy_id": 1,
                "taxonomy": "category",
                "description": "",
                "parent": 10,
                "count": 7,
                "filter": "raw"
            },
            "secondcat": {
                "term_id": 2,
                "name": "Second Cat",
                "slug": "secondcat",
                "term_group": 0,
                "term_taxonomy_id": 2,
                "taxonomy": "category",
                "description": "",
                "parent": 1,
                "count": 1,
                "filter": "raw"
            }
        }
    }
}
```

All the objects and keys need to be parsed and accessible to be used in output messages formatter. 
This can either to be done by a dev defined script, or a easy to use UI based formatter that compose a new message by using keys provided in JSON.

