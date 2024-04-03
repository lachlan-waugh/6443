import base64

db = []

def add_comment(comment):
    db.append(comment.encode())


def get_comments(query=None):
    return [base64.b64encode(comment).decode() for comment in db]
