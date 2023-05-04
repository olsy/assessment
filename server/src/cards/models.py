from sqlalchemy import MetaData, Column, Integer, String
from sqlalchemy.orm import declarative_base

metadata = MetaData()
Base = declarative_base()


class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(255), unique=True, nullable=False)
    title = Column(String(255), unique=True, nullable=False)
    position = Column(Integer, nullable=False)
    image = Column(String(255), nullable=False)
