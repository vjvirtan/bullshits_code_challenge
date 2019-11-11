import React, { useReducer } from 'react'
import FetchData from '../hooks/FetchData'
import { AnalyseReducer } from '../hooks/Reducer';
import '../App.css'

export default function Main() {

    const [useData, isFetching] = FetchData(false);
    const [finnish, dispatch] = useReducer(AnalyseReducer, []);
    const f = [] // useState is not an option at this case. Too many rerenders
    const n = []
    const b = []

    const Results = () => {


        finnish.map(e => {
            if (e.finnish === 'true') {
                f.push(e)
            } else if (e.finnish === 'notSure') {
                n.push(e)
            } else if (e.finnish === 'false') b.push(e);
        })

        return (
            <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                                {f.map(f => {
                                    return <tr key={f.index}><td ><label>Index: {f.index} <br />{f.line}</label></td></tr>
                                })}
                            </tbody>
                        </table>
                    </td>

                    <td>
                        <table>
                            <tbody>
                                {n.map(f => {
                                    return <tr key={f.index}><td ><label>Index: {f.index} <br />{f.line}</label></td></tr>
                                })}
                            </tbody>
                        </table>
                    </td>

                    <td>
                        <table>
                            <tbody>
                                {b.map(f => {
                                    return <tr key={f.index}><td ><label>Index: {f.index} <br />{f.line}</label></td></tr>
                                })}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        )
    }


    return (
        <div>
            {finnish.length === 0 ? (
                <button onClick={() => dispatch({ type: "ANALYSE_DATA", payload: useData })}>analyse data</button>
            ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Finnish</th>
                                <th>Chance to be Finnish</th>
                                <th>Total Bullshits</th>
                            </tr>
                        </thead>
                        <Results />
                    </table>
                )}

        </div>

    );

}

