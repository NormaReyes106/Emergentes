import { useState, ChangeEvent , FormEvent, Dispatch, useEffect} from "react"
import { v4 as uuidv4 } from "uuid"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { ActivityActions, ActivityState } from "../reducers/activity-reducers"

type FormProps ={
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity={
    id: uuidv4(),
    category: 1,
    name:'',
    calories:''
}

export default function Form({dispatch, state}: FormProps){

    const [activity, setActivity] = useState<Activity>(initialState)
          
    useEffect(() => {
        if(state.activeId){
            const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectActivity)
        }
    }, [state.activeId])



    const handleChange =(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>{        
        const isNumberFiel = ['category', 'calories'].includes(e.target.id)        
        setActivity({
            ...activity,
            [e.target.id]: isNumberFiel ? +e.target.value : e.target.value
        })     
    }

    const isValidActivity = () => {
        const {name, calories} = activity
        return name.trim() !== '' && Number(calories) > 0
    }
    


    const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({ type: "save-activity", payload: {newActivity: activity}})

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    

    return (
        
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg" 
            onSubmit={handleSubmit}
            >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Servicio:</label>
                <select
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                    >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">Cliente:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Nombre del cliente"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Placas:</label>
                <input
                    id="calories"
                    type="text"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Placas del vehiculo"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>

            <input
                type= "submit"
                className="bg-gray-800 hover:gb-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled = {!isValidActivity()}
            />

        </form>
    )
}