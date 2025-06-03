const fs = require('fs');
const [,, cmd, ...args] = process.argv;
const file = 'todo.json';

let todos = JSON.parse(fs.readFileSync(file, 'utf8'));

if(cmd === 'add'){
    const task = args.join(' ');
    todos.push({task, done: false});
    console.log(`Added: ${task}`);
}
else if(cmd === 'list'){
    todos.forEach((t, i) => {
        console.log(`${i+1}. [${t.done ? 'x' : ' '}] ${t.task}`);
    });
}
else if(cmd === 'done'){
    const index = +args[0] - 1;
    if(todos[index]) todos[index].done = true;
}
else if(cmd === 'delete'){
    const index = +args[0] - 1;
    if(todos[index]) todos.splice(index, 1);
}
else{
    console.log('Usage: add/list/done/delete');
}

fs.writeFileSync(file, JSON.stringify(todos, null, 2));
 
