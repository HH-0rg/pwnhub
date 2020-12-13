from flask import Flask, request, g, jsonify
import sqlite3
app = Flask(__name__)

DATABASE = '../../../storage/pwnhub.db'


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/login')
def login():
    username = request.args.get('username')
    cur = get_db().execute("Select * from users WHERE username=?", (username,))
    rv = cur.fetchall()
    cur.close()
    data = []
    for r in rv:
        data.append({'exploit': r['exploit'], 'gist': r['gist']})
    return jsonify(data)

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)