export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "DELETE",
    });
  }
  

  export async function PATCH(request: Request) {
    const { isDone, id } = await request.json();
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isDone: !isDone }),
    });
  }