db = [
    "Why couldn't the bicycle stand up by itself? Because it was two-tired.",
    "What do you call an alligator wearing a vest? An investigator.",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "What do you get when you cross a snowman and a shark? Frostbite.",
    "Why did the tomato turn red? Because it saw the salad dressing.",
    "What did one hat say to the other? You stay here, I'll go on ahead.",
    "What did the janitor say when he jumped out of the closet? \"Supplies!\"",
    "What do you call fake spaghetti? An impasta.",
    "I'm reading a book on the history of glue. I just can't seem to put it down.",
    "How do you organize a space party? You planet.",
    "Why don't scientists trust atoms? Because they make up everything.",
    "Did you hear about the kidnapping at the park? They woke up.",
    "Why was the math book sad? Because it had too many problems.",
    "Why did the tomato turn green? Because it saw the salad dressing.",
    "What's the difference between a poorly dressed man on a trampoline and a well-dressed man on a trampoline? Attire."
]

def add_comment(comment):
    db.append(comment)

def get_comments(query=None):
    return db