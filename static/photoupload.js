let fileSelection

window.onload = () => {
    fileSelection = document.getElementById('file_selection')
    document.getElementById('go_button').onclick = fileSelectionChanged
}

function fileSelectionChanged() {
    for (let file of fileSelection.files) {
        let reader = new FileReader()
        reader.onload = (fileEvent) => {
            console.log(file)
            alert(file.name + " = length: " + fileEvent.target.result.length);
        }
        reader.readAsText(file);
    }
}
