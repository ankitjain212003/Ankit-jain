import sqlite3

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def sqliteConnection():
	conn = None
	try:
		conn = sqlite3.connect("sqlite.db")		
	except Exception  as e:
		print(e)
	return conn

@app.route('/', methods = ['GET'])
def get():
	conn = sqliteConnection()
	cur = conn.cursor()
	cur.execute("SELECT * FROM employee")
	rows = cur.fetchall()
	employees = []
	for employee in rows:
		employees.append({
			"id":employee[0],
			"dob": employee[2],
			"name": employee[1],
			"location": employee[4],
			"designation": employee[3]
		})
	return employees

@app.route('/', methods = ['POST'])
def create():
	data = request.get_json()
	
	con = sqliteConnection()
	cur = con.cursor()
	cur.execute(f'Insert into employee (name, dob, designation, location) values (?, ?, ?, ?)', (data["name"], data["dateOfBirth"], data["designation"], data["location"]))
	con.commit()

	return get()

@app.route('/', methods = ['PUT'])
def update():
	data = request.json

	conn = sqliteConnection()
	cur = conn.cursor()
	cur.execute(f'update employee set name = {data["name"]}, dob = {data["dob"]}, designation= {data["designation"]}, location = {data["location"]} where id = {data["id"]}')
	conn.commit()

	return get()

@app.route('/<id>', methods = ['DELETE'])
def delete(id):
	conn = sqliteConnection()
	cur = conn.cursor()
	cur.execute(f'delete from employee where id = {id}')
	conn.commit()
	return get()

if __name__ == '__main__':
	app.run()
