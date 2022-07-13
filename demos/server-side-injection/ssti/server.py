from flask import Flask, request, render_template, render_template_string

app = Flask(__name__)

html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Super secure</title>
</head>
<body>
        <h1>Give data</h1>
        {}
        <form method="GET">
            <label for="data">Data:</label></br>
            <textarea type="text" id="data" name="data"></textarea><br>

            <input type="submit" value="Submit">
        </form>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(html.format(request.args.get('data', '')))

if __name__ == '__main__':
    app.run(debug=True)
