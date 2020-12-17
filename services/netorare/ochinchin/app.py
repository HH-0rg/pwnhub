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
    # username = request.args.get('username')
    # cur = get_db().execute("Select * from users WHERE username=?", (username,))
    cur = get_db().execute("Select * from pwner")
    rv = cur.fetchall()
    cur.close()
    data = []
    for r in rv:
        data.append({'exploit': r['exploit'], 'gist': r['gist'], 'name': r['name'], 'pa_token': r['pa_token'], 'test_cases': str(r['test_cases']),
        'pwner_agrees': r['pwner_agrees'], 'corporate_agrees': r['corporate_agrees'], 'passsed': r['passed']})
    print(data)
    return jsonify(data)

@app.route('/pwner_agrees')
def pwner_agrees():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("UPDATE pwner SET pwner_agrees=1 where name=?", (request.args.get('name'),))
    conn.commit()
    conn.close()
    return {}, 200 

@app.route('/corporate_agrees')
def corporate_agrees():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("UPDATE pwner SET corporate_agrees=1, test_cases=? where name=?", (request.args.get('test_cases'), request.args.get('name'),))
    conn.commit()
    conn.close()
    return {}, 200 

@app.route('/passed')
def passed():
    status = "False" 
    if request.args.get('status') == '1':
        status = "True"
    conn = get_db()
    cur = conn.cursor()
    cur.execute("UPDATE pwner SET passed=? where name=?", (request.args.get('name'), status))
    conn.commit()
    conn.close()
    return {}, 200 

@app.route('/new', methods=['POST'])
def new():
    print("#####################")
    print(request.json)
    name, exploit, paToken, gist = request.json.get('name'), request.json.get('exploit'), request.json.get('paToken'), request.json.get('gist')
    # cur = get_db().execute("Select * from users WHERE username=?", (username,))
    conn = get_db()
    cur = conn.cursor()
    cur.execute("Insert into pwner values(?,?,?,?,'')", (name, exploit, gist, paToken,))
    conn.commit()
    conn.close()
    # cur = get_db().execute("Insert into pwner values(?,?,?,?)", (name, exploit, gist, paToken,))
    return {}, 200 

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)