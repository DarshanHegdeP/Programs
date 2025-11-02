import React from "react";

class Edrow extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.place}</td>
                <td>{this.props.stddeg}</td>
                <td>{this.props.grade}</td>
            </tr>
        )
    }
}

class EdTable extends React.Component{
    render(){
        const education=[
            {
                id:1,
                name:"MES PU Collegde",
                place:"Sirsi",
                stddeg:"12"
                ,grade:"A"
            },
               {
                id:2,
                name:"RV Collegde",
                place:"Bangalore",
                stddeg:"PG"
                ,grade:"A"
            },
               {
                id:2,
                name:"UASB",
                place:"Bangalore",
                stddeg:"UG"
                ,grade:"A"
            },
        ];

        const edudetails=education.map(edu=>{
            return(
            <Edrow key={edu.id}
            id={edu.id}
            name={edu.name}
            place={edu.place}
            stddeg={edu.stddeg}
            grade={edu.grade}
            />
            );

        });

        return(
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Place</th>
                        <th>Education</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {edudetails}
                </tbody>
            </table>
        )

    }
}

class Education extends React.Component{
    render(){
        return(
            <section>
                <EdTable/>
            </section>
        )
    }
}
export default Education;