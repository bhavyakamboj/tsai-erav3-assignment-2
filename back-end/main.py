from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Read the file content
        contents = await file.read()
        
        response_data = {
            "name": file.filename,
            "size": f"{len(contents) / 1024:.2f} KB",
            "type": file.content_type
        }

        return JSONResponse(content=response_data)
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)}, 
            status_code=400
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)