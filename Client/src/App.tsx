import { useReducer, useEffect, useMemo } from "react"
import Form from "./components.tsx/Form"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import ActivityList from "./components.tsx/ActivityList"


function App() {

  const[state, dispatch] = useReducer(activityReducer, initialState)
 
  useEffect(()=>{
      localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])


  const canRestartApp  = ()=> useMemo(()=> state.activities.length, [state.activities])

  return (
    <>
      <header className="bg-lime-600 py-3 "> 
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
          Estacionamiento 
          </h1>

          <button className="br-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer 
                            rounded-lg text-sm 
                            disabled:opacity-10"
                            disabled={!canRestartApp()}
                            onClick={()=> dispatch({type: 'restart-app'})}
                            >
            REINICIAR APP
          </button>

        </div>
      </header>
      <section className="bg-gray-300 py-20 px-5 ">
        <div className="max-w-4xl mx-auto">
          <Form 
            dispatch={dispatch}
            state={state}
          />  
        </div>
      </section>
      <section className="bg-gray-800 py-0.5 "></section>
      
      <section className="p-10 mx-auto max-w-4xl">
          <ActivityList
          activities = {state.activities}
          dispatch = {dispatch}
         />
      </section>
    </>
  )
}

export default App
