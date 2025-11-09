import React from "react";

const studlist = [{
    slno: 1,
    name: "Student1",
    usn: "1MS17CS001",
    tmarks: 150

}, {
    slno: 2,
    name: "Student1",
    usn: "1MS17CS001",
    tmarks: 150
}]
class StudentRow extends React.Component{
    render(){
        const stud1=this.props.stdli;
        return (
            <tr>
                <th>{stud1.slno}</th>
                <th>{stud1.name}</th>
                <th>{stud1.usn}</th>
                <th>{stud1.tmarks}</th>
            </tr>
        )
    }
}

class StudentsTable extends React.Component{
    render(){
        const studRows=this.props.studlist.map(studli=>
            <StudentRow key={studli.slno} stdli={studli}/>
        );
        return(
            <table>
                <tr>
                    <th>SL NO</th>
                    <th>Student Name</th>
                    <th>USN</th>
                    <th>Total Marks</th>
                </tr>
                <tbody>
                    {studRows}
                </tbody>
            </table>
        )
    }
}

class StudentAddSubmit extends React.Component{
    constructor(){
        super();
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        const form=document.forms.studAdd;
        const studli={
            name:form.name.value,
            usn:form.usn.value,
            tmarks:form.tmarks.value
        }
        console.log("studli - ",studli)
        this.props.CreateStudentAdd(studli)
        form.name.value='';form.usn.value="";form.tmarks.value="";
    }
    render(){
        return(
            <form name="studAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Name"/>
                <input type="text" name="usn" placeholder="USN"/>
                <input type="text" name="tmarks" placeholder="Total Marks"/>
                <button>Add</button>
            </form>
        )
    }
}

class StudentListTable extends React.Component{
    constructor(){
        super();
        this.state={newStudList:[]};
        this.CreateStudentAdd=this.CreateStudentAdd.bind(this);
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        setTimeout(()=>{
            this.setState({newStudList:studlist})
        },5000)
        console.log("I have loaded student add component also")
    }


CreateStudentAdd(studli){
    const studlength=this.state.newStudList.length+1;
    studli.slno=studlength;
    const newStudList1=this.state.newStudList.slice();
    newStudList1.push(studli);
    this.setState({newStudList:newStudList1})

}
render(){
    return(
        <>
        <hr/>
        <StudentsTable studlist={this.state.newStudList}/>
        <hr/>
        <StudentAddSubmit CreateStudentAdd={this.CreateStudentAdd}/>
        </>
    )
}
}
export default StudentListTable;