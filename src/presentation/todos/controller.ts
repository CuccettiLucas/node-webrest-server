import { error } from "console";
import { Request,Response } from "express";

interface Todo {
    id:number;
    text:string;
    completedAt: Date | null
}

const todos:Todo[] = [
    {id:1,text:'Buy milk', completedAt: new Date()},
    {id:2,text:'Buy tomato', completedAt: new Date()},
    {id:3,text:'Buy potato', completedAt: new Date()},
]

export class TodosController {

    //* Dependency injection
    constructor(){}


    public getTodos = (req:Request, res:Response) =>{
        return res.json(todos);        
    }

    public getTodoById = (req:Request, res:Response) =>{
        const id = +req.params.id; // ------> el + es para pasarlo a string
        if(isNaN(id)) return res.status(400).json({error:`Bad request`});
        const todo = todos.find(todo => todo.id === id);
        
        (todo)
            ? res.json(todo)
            : res.status(404).json({error:`TODO with id ${ id } not found`});

    }

    public createTodo = (req:Request, res:Response)=>{
        const {text} = req.body;

        if(!text) res.status(400).json({error:'Text property is required'});

        const newTodo:Todo = {
            id: todos.length + 1,
            text: text,
            completedAt:null
        }

        todos.push(newTodo);
        res.json(newTodo);
    }

    public updateTodo = (req:Request, res:Response) =>{
        const id = +req.params.id; // ------> el + es para pasarlo a string
        if( isNaN(id)) return res.status(400).json({error:"Id is not a number"});

        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error:`Todo with id ${ id } not found.`});

        const { text, completedAt } = req.body;

        todo.text = text || todo.text;
        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);

        res.json(todo);
    }


    // public deleteTodo = (req:Request, res:Response) =>{
    //     const id = +req.params.id;
    //     if (isNaN(id)) return res.status(400).json({error:"Id is not a number"});

    //     const todo = todos.find(todo => todo.id === id);
    //     if(!todo) return res.status(404).json({error:`Todo with id ${id} not found.`});

    //     todos.filter(t => t.id !== todo.id);
    //     res.json({message:"Todo deleted: ",deleted:todo});
        
    // }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: "Id is not a number" });

        const index = todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            return res.status(404).json({ error: `Todo with id ${id} not found.` });
        }

        const deleted = todos[index];
        todos.splice(index, 1);

        res.json({ message: "Todo deleted", deleted });
    }



}