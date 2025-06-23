import csv 
from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# File Upload Setup
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

# Database Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(50))
    fullname = db.Column(db.String(100))
    mobile = db.Column(db.String(20))
    email = db.Column(db.String(100))
    flat = db.Column(db.String(50))
    building = db.Column(db.String(100))
    street = db.Column(db.String(100))
    landmark = db.Column(db.String(100))
    pincode = db.Column(db.String(10))
    adhar = db.Column(db.String(20))
    adhar_copy = db.Column(db.String(200))
    passport_photo = db.Column(db.String(200))

@app.route('/')
def home():
    return redirect(url_for('add_user'))

@app.route('/add-user', methods=['GET', 'POST'])
def add_user():
    session['user'] = 'admin'  # Simulate logged-in user

    if 'user' not in session:
        return redirect(url_for('login'))

    if request.method == 'POST':
        adhar_copy_file = request.files.get('adhar_copy')
        passport_photo_file = request.files.get('passport_photo')

        adhar_copy_path = ''
        passport_photo_path = ''

        if adhar_copy_file and adhar_copy_file.filename != '':
            adhar_copy_path = os.path.join(app.config['UPLOAD_FOLDER'], adhar_copy_file.filename)
            adhar_copy_file.save(adhar_copy_path)

        if passport_photo_file and passport_photo_file.filename != '':
            passport_photo_path = os.path.join(app.config['UPLOAD_FOLDER'], passport_photo_file.filename)
            passport_photo_file.save(passport_photo_path)

        new_user = User(
            role=request.form.get('role'),
            fullname=request.form.get('fullname'),
            mobile=request.form.get('mobile'),
            email=request.form.get('email'),
            flat=request.form.get('flat'),
            building=request.form.get('building'),
            street=request.form.get('street'),
            landmark=request.form.get('landmark'),
            pincode=request.form.get('pincode'),
            adhar=request.form.get('adhar'),
            adhar_copy=adhar_copy_path,
            passport_photo=passport_photo_path
        )

        db.session.add(new_user)
        db.session.commit()

        flash("User Added Successfully!", "success")
        return redirect(url_for('add_user'))

    return render_template('add_user.html')

# Database setup - runs once before serving requests

def create_tables():
    db.create_all()

    import csv

def import_users_from_csv(filename):
    with open(filename, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            existing_user = User.query.filter_by(mobile=row['mobile']).first()
            if not existing_user:  # Avoid duplicates
                new_user = User(
                    role=row['role'],
                    fullname=row['fullname'],
                    mobile=row['mobile'],
                    email=row['email'],
                    flat=row['flat'],
                    building=row['building'],
                    street=row['street'],
                    landmark=row['landmark'],
                    pincode=row['pincode'],
                    adhar=row['adhar'],
                    adhar_copy=row['adhar_copy'],
                    passport_photo=row['passport_photo']
                )
                db.session.add(new_user)
        db.session.commit()
    print("Data imported successfully.")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables exist
        import_users_from_csv('users.csv')  # Import your CSV
    app.run(debug=True)


