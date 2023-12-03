from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.String(50))
    content = db.Column(db.String(500))
    session = db.Column(db.Integer)

    def to_dict(self):
        return {"id": self.id, "sender": self.sender, "content": self.content, "session": self.session}