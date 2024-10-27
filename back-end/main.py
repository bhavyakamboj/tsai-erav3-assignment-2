from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Read the file content
        contents = await file.read()
        
        # Get file information
        file_name = file.filename
        file_size = len(contents)
        file_type = file.content_type

        # Prepare the response
        response_data = {
            "name": file_name,
            "size": f"{file_size / 1024:.2f} KB",
            "type": file_type
        }

        return JSONResponse(content=response_data)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)