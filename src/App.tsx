import './App.css'
import TaskBoard from './components/TaskBoard'
import TaskSummary from './components/TaskSummary'
import { AppContextProvider } from './context/AppContext'

function App() {
  return (
    <AppContextProvider>
    <div className='app'>
      <h1 className='app_title'>✅ Todo List</h1>
      <TaskSummary/>
      <TaskBoard/>
    </div>
    </AppContextProvider>
  )
}

export default App
