from pydantic import AnyUrl, BaseModel, Field, constr


class CardBase(BaseModel):
    id: int = Field(ge=0)
    type: constr(regex="^[a-z-]+$", to_lower=True)
    title: str = Field(min_length=3, max_length=15)
    position: int = Field(ge=0)
    image: AnyUrl


class CardCreate(CardBase):
    id: int = None


class CardUpdate(CardCreate):
    class Config:
        extra = 'ignore'
        fields = {'id': {'exclude': True}}


class CardDelete(BaseModel):
    id: int = Field(ge=0)
