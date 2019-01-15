import React from "react";
import PropTypes from "prop-types";
import SinoRoundButton from "./SinoRoundButton";
import XLSX from "xlsx";

class SinoExportXlsx extends React.Component {
	constructor(props) {
		super(props);
		this.onFileExport = this.onFileExport.bind(this);
	}

	onFileExport() {
		const sheet = XLSX.utils.aoa_to_sheet(this.props.data);
		const xlsxFile = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(xlsxFile, sheet, "data");
		XLSX.writeFile(xlsxFile, this.props.file_name);
	}

	render() {
		return (
			<SinoRoundButton
				text={"Export"}
				octicons_icon={"file"}
				onButtonClick={this.onFileExport}
			/>
		);
	}
}

SinoExportXlsx.propTypes = {
	file_name: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired,
	
};

SinoExportXlsx.defaultProps = {
	file_name: "report.xlsx",
	data: [],
	
};

export default SinoExportXlsx;