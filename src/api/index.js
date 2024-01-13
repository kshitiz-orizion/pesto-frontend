const BASE_URL = "http://localhost:5000/todo/"
const Headers ={headers: {"Content-Type":"application/json"}}

export const getTodo = async() => {
    const response = await fetch(BASE_URL,{method: "GET", ...Headers});
    const todo = await response.json();
    return todo;
}

export const getTodoById = async(id) => {
    const response = await fetch(BASE_URL+id,{method: "GET", ...Headers});
    const todo = await response.json();
    return todo;
}

export const deleteTodo = async(id) => {
    const response = await fetch(BASE_URL+id,{method: "DELETE",...Headers});
    const todo = await response.json();
    return todo;
}

export const postTodo = async(body) => {
    const response = await fetch(BASE_URL,{method: "POST", body:JSON.stringify(body),...Headers});
    const todo = await response.json();
    return todo;
}

export const putTodo = async(id,body) => {
    const response = await fetch(BASE_URL+id,{method: "PUT", body:JSON.stringify(body), ...Headers});
    const todo = await response.json();
    return todo;
}