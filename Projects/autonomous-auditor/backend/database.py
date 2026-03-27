from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime

# We will store the database file in a new 'data' folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./data/auditor_memory.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# This is the exact blueprint for our database table
class AuditRecord(Base):
    __tablename__ = "audit_records"

    id = Column(Integer, primary_key=True, index=True)
    target = Column(String, index=True)
    agent = Column(String)
    issues_found = Column(Integer)
    report = Column(Text)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
