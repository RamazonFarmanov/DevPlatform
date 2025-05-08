import * as React from 'react';
import withRoute from '../withRoute';
import docxIcon from '../assets/docx.png';
import pdfIcon from '../assets/pdf.png';
import zipIcon from '../assets/zip.png';
import rarIcon from '../assets/rar.png';
import { Link } from 'react-router-dom';

class OrdersEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            selectedFile: null,
            fileUrl: null,
            fileIcon: null,
            termType: "Negotiable",
            date: "",
            time: "",
            duration: 0,
            timeUnit: "Hour",
            priceType: "Negotiable",
            price: 0,
            addedSkills: [],
            allSkills: null,
            rangedSkills: [],
            skill: "",
            errors: null,
            messages: null
        }
        // this.getSkills = this.getSkills.bind(this);
        this.onRelease = this.onRelease.bind(this);
        this.onClearClicked = this.onClearClicked.bind(this);
        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.onDescriptionChanged = this.onDescriptionChanged.bind(this);
        this.onFileDeleted = this.onFileDeleted.bind(this);
        this.onTermTypeChanged = this.onTermTypeChanged.bind(this);
        this.onDateChanged = this.onDateChanged.bind(this);
        this.onTimeChanged = this.onTimeChanged.bind(this);
        this.onDurationChanged = this.onDurationChanged.bind(this);
        this.onTimeUnitChanged = this.onTimeUnitChanged.bind(this);
        this.onPriceTypeChanged = this.onPriceTypeChanged.bind(this);
        this.onPriceChanged = this.onPriceChanged.bind(this);
        this.onSkillChanged = this.onSkillChanged.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.cleanUpUrl = this.cleanUpUrl.bind(this);
        this.removeSkill = this.removeSkill.bind(this);
        this.addSkill = this.addSkill.bind(this);
    }
    componentDidMount(){
        // this.getSkills();
    }
    componentWillUnmount() {
        this.cleanUpUrl();
    }
    clickHandler(e, handler) {
        e.preventDefault();
        handler();
    }
    // async getSkills(){
    //     const skills = ["Skill 1", "Skill 2", "Another 1", "Another 2", "Some 1", "Some 2"];
    //     this.setState({allSkills: skills, rangedSkills: skills});
    // }
    async onRelease(){
        const deadlene = new Date(`${this.state.date}T${this.state.time}`);
        const result = await fetch('/api/orders/createorder', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: this.state.title, description: this.state.description, priceType: this.state.priceType, priceVal: this.state.price, termType: this.state.termType, deadline: deadlene, duration: this.state.duration, timeUnit: this.state.timeUnit })
        });
        if(result.ok){
            const data = await result.json();
            console.log(data);
        }
        else{
            const data = await result.json();
            console.log(data);
        }
    }
    onClearClicked(){
        this.setState({ title: "", description: "", termType: "Negotiable", date: "", time: "", duration: "", timeUnit: "Hour", priceType: "Negotiable", price: 0, addedSkills: [], skill: "" });
        this.onFileDeleted();
    }
    onTitleChanged(e) {
        this.setState({ title: e.target.value });
    }
    onDescriptionChanged(e) {
        this.setState({ description: e.target.value });
    }
    onFileDeleted(e){
        this.setState({ selectedFile: null, fileIcon: null });
        this.cleanUpUrl();
    }
    onTermTypeChanged(e) {
        this.setState({ termType: e.target.value });
    }
    onDateChanged(e) {
        this.setState({ date: e.target.value }, () => console.log(this.state.date));
    }
    onTimeChanged(e) {
        this.setState({ time: e.target.value }, () => console.log(this.state.time));
    }
    onDurationChanged(e) {
        this.setState({ duration: e.target.value });
    }
    onTimeUnitChanged(e) {
        this.setState({ timeUnit: e.target.value });
    }
    onPriceTypeChanged(e) {
        this.setState({ priceType: e.target.value });
    }
    onPriceChanged(e) {
        this.setState({ price: e.target.value });
    }
    onSkillChanged(e) {
        this.setState({ skill: e.target.value });

    }
    handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > (10 * 1024 * 1024)) {
                alert("File is too big, max size - 10 MB!");
                return;
            }
            if (this.state.fileUrl) {
                URL.revokeObjectURL(this.state.fileUrl);
            }
            // Создаём новую
            const extension = file.name.split(".").pop().toLowerCase();
            var icon = null;
            if (extension === "docx" || extension === "doc") {
                icon = docxIcon;
            }
            if (extension === "pdf") {
                icon = pdfIcon;
            }
            if (extension === "zip") {
                icon = zipIcon;
            }
            if (extension == "rar") {
                icon = rarIcon;
            }
            const Url = URL.createObjectURL(file);
            this.setState({ selectedFile: file, fileUrl: Url, fileIcon: icon });
        }
    }
    cleanUpUrl() {
        // После того как компонент будет размонтирован или URL не будет нужен
        this.setState(prevState => {
            if (prevState.fileUrl) {
                URL.revokeObjectURL(prevState.fileUrl);
            }
        });
    }
    removeSkill(skill){
        const newSkills = [...this.state.addedSkills];
        const index = newSkills.findIndex(s => s === skill);
        console.log(index);
        newSkills.splice(index, 1);
        this.setState({ addedSkills: newSkills });
    }
    addSkill(skill){
        if(skill === ""){
            return;
        }
        const newSkills = [...this.state.addedSkills];
        newSkills.push(skill);
        this.setState({ addedSkills: newSkills, skill: "" });
    }
    render() {
        return (
            <div className="container d-flex justify-content-center p-4">
                <div className="w-75 needs-validation" noValidate>
                    <div>
                        <h2>Title</h2>
                        <p className="fs-5">Give name to your order (*):</p>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.onTitleChanged} />
                    </div>
                    <hr className="mt-4" />
                    <div>
                        <h2 className="mt-4">Description</h2>
                        <p className="fs-5">Add short description, so every one could undersand what to do in general (*):</p>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.onDescriptionChanged} />
                    </div>
                    <hr className="mt-4" />
                    <div>
                        <h2 className="mt-4">Attached file</h2>
                        <p className="fs-5">Choose file that will provide detailed information to developer (.docx, .pdf, .zip, .rar):</p>
                        <div className="container-fluid d-flex">
                            <div className="w-50">
                                <input type="file" id="fileInput" accept=".docx, .pdf, .zip, .rar" style={{ display: "none", height: "50px" }} onChange={this.handleFileChange} />
                                <label htmlFor="fileInput" className="btn btn-primary me-2">Upload file</label>
                                <span>10 MB max</span>
                            </div>
                            <div className="w-50 align-items-start">
                                {this.state.selectedFile ? (<div className="d-flex justify-content-between" style={{ height: "50px", background: "#ffffff", border: "solid black 1px", borderRadius: "5px", padding: "5px" }}>
                                    <img src={this.state.fileIcon} alt="Image" style={{ height: "100%" }} />
                                    <span className="fs-5 m-1">{this.state.selectedFile?.name}</span>
                                    <button className="btn" onClick={this.onFileDeleted}><i className="bi bi-x"></i></button>
                                </div>) : (<span>No file choosen</span>)}
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="container-fluid d-flex mt-4  justify-content-between">
                        <div className="w-50 m-2">
                            <h2>Term</h2>
                            <p className="fs-5">Choose term type of your order (*):</p>
                            <select className="form-select mb-3" onChange={this.onTermTypeChanged}>
                                <option value="Negotiable">Negotiable</option>
                                <option selected={this.state.termType === "Deadline"} value="Deadline">Deadline</option>
                                <option selected={this.state.termType === "Duration"} value="Duration">Duration</option>
                            </select>
                            {this.state.termType === "Deadline" && (
                                <div>
                                    <p className="fs-5 mt-2">Set deadline (*):</p>
                                    <div className="input-group">
                                        <input type="date" className="form-control" value={this.state.date} onChange={this.onDateChanged} />
                                        <input type="time" className="form-control" value={this.state.time} onChange={this.onTimeChanged} />
                                    </div>
                                </div>
                            )}
                            {this.state.termType === "Duration" && (
                                <div>
                                    <p className="fs-5 mt-2">Set duration (*):</p>
                                    <div class="input-group">
                                        <input type="number" className="form-control" value={this.state.duration} onChange={this.onDurationChanged} />
                                        <select className="form-select" onChange={this.onTimeUnitChanged}>
                                            <option value="Hour">Hours</option>
                                            <option selected={this.state.timeUnit === "Day"} value="Day">Days</option>
                                            <option selected={this.state.timeUnit === "Week"} value="Week">Weeks</option>
                                            <option selected={this.state.timeUnit === "Month"} value="Month">Months</option>
                                            <option selected={this.state.timeUnit === "Year"} value="Year">Years</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-50 m-2">
                            <h2>Offered price</h2>
                            <p className="fs-5">Choose price type (*):</p>
                            <select className="form-select mb-3" onChange={this.onPriceTypeChanged}>
                                <option value="Negotiable">Negotiable</option>
                                <option selected={this.state.priceType === "Fixed"} value="Fixed">Fixed</option>
                            </select>
                            <p className="fs-5 mt-2">Set price:</p>
                            <div className="input-group">
                                <input type="number" className="form-control" value={this.state.price} onChange={this.onPriceChanged} />
                                <select className="form-select">
                                    <option value="UZS">Sums</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="mt-4">
                        <h2>Skills</h2>
                        <p className="fs-5">Add skills that are required:</p>
                        <div className="container-fluid d-flex">
                            <p className="mt-1 me-4">Added skills:</p>
                            {this.state.addedSkills.length > 0 ? 
                            (<div>
                                {this.state.addedSkills.map(skill => (<button style={{ background: "#ffffff", border: "solid black 1px", borderRadius: "5px", padding: "5px", marginRight: "5px", marginBottom: "5px" }} onClick={() => this.removeSkill(skill)}>{skill}</button>))}
                            </div>) : 
                            (<span className="mt-1">No skills added!</span>)}
                        </div>
                        <div className="container-fluid d-flex mt-3">
                            <input className="form-control me-2" value={this.state.skill} onChange={this.onSkillChanged} />
                            <button className="btn btn-primary" style={{width: "100px"}} onClick={() => this.addSkill(this.state.skill)}>Add skill</button>
                        </div>
                        <div className="mt-3">
                            <p className="mt-1 me-4">All skills:</p>
                            {this.state.rangedSkills.length > 0 ? 
                            (<div>
                                {this.state.rangedSkills.map(skill => (<button style={{ background: "#ffffff", border: "solid black 1px", borderRadius: "5px", padding: "5px", marginRight: "5px", marginBottom: "5px" }} onClick={() => this.addSkill(skill)}>{skill}</button>))}
                            </div>) : 
                            (<span className="mt-1">Please wait!</span>)}
                        </div>
                    </div>
                    <hr className="mt-4"/>
                    <div className="container-fluid d-flex mt-4 justify-content-between">
                        <button className="btn btn-light" onClick={this.onClearClicked}>Clear</button>
                        <button className="btn btn-primary" onClick={this.onRelease}>Release order</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRoute(OrdersEditor);