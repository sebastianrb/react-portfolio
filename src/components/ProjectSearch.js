import React from "react";
import InputBoxDoneTyping from "react-input-box-done-typing";

export default class ProjectSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			placeholderText: ""
		};

		this.onSearchChange = this.onSearchChange.bind(this);
		this.loadingToggle = this.loadingToggle.bind(this);
	}

	componentWillMount() {
		if (window.innerWidth > 500) {
			this.setState({
				placeholderText: "Search based on technologies used, project title, keywords, etc..."
			});
		} else {
			this.setState({
				placeholderText: "Search projects"
			});
		}
	}

	onSearchChange(searchValue) {
		// let searchValue = event.target.value;
		this.props.onSearchChange(searchValue);
	}

	onSubmit(event) {
		event.preventDefault();
	}

	loadingToggle(value) {
		let timeout = "";
		if (timeout) {
			clearTimeout(timeout);
		}
		this.setState(
			{
				loading: false
			},
			() => {
				if (value === "") {
					this.setState({
						loading: false
					});
				} else {
					timeout = setTimeout(() => {
						this.setState({
							loading: true
						});
					});
				}
			}
		);
	}

	render() {
		return (
			<div className="project-search">
				<h3 className="project-search__caption">Project List</h3>
				<form onSubmit={this.onSubmit} className="project-search__form">
					<InputBoxDoneTyping
						id="input-box-done-typing"
						className="project-search__search-box"
						placeholder={this.state.placeholderText}
						maxLength={20}
						defaultValue=""
						autoComplete="off"
						onChange={value => {
							this.loadingToggle(value);
						}}
						doneTyping={value => {
							this.onSearchChange(value);
						}}
						doneTypingInterval={700}
					/>
					<div className="project-search__loading-bar-container">
						<div className={`project-search__loading-bar ${this.state.loading ? "loading" : ""}`} />
					</div>
				</form>
			</div>
		);
	}
}
