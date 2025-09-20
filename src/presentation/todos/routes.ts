import { Router } from "express";
import { TodosController } from "./controller";



export class TodosRoutes{

    static get routes():Router{
        const router = Router();

        const todoController = new TodosController();
        /*
        '/' ---> Se asume que la ruta es la que viene del Middlewares
        Middlewares ---> ./presentation/routes ( el base )
        */
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }

}