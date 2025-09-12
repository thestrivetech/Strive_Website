# This is code that supabase says to put into the project in order to connnect it with supabase
## Please make sure to integrate all code below into the existing directory for the project - There's no need to rename files unless it's absolutely necessary

### utils/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
        
### App.tsx


import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

function Page() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    function getTodos() {
      const { data: todos } = await supabase.from('todos').select()

      if (todos.length > 1) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </div>
  )
}
export default Page


### .env (already done)


VITE_SUPABASE_URL=https://qnfcdyjhzolhsokblslb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZmNkeWpoem9saHNva2Jsc2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MDU4NjUsImV4cCI6MjA3MzE4MTg2NX0.d-s-muQ1Qf8RgXVBsYAZMkPf9bdV53yLYB4E4qJ1PS0
