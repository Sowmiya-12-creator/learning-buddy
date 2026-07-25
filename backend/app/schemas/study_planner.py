from pydantic import BaseModel, Field


class StudyPlannerRequest(BaseModel):
    subjects: list[str] = Field(min_length=1, max_length=10)
    number_of_days: int = Field(ge=1, le=30)


class StudyTask(BaseModel):
    subject: str
    topic: str
    duration_minutes: int
    activity: str


class DailyStudyPlan(BaseModel):
    day: int
    tasks: list[StudyTask]


class StudyPlannerResponse(BaseModel):
    plan_title: str
    goal: str
    daily_study_time: int
    number_of_days: int
    study_plan: list[DailyStudyPlan]