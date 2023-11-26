import "./savebutton.component.css";

const SaveButton = (props: any) => {
    return (
        <div className="save-btn" onClick={props.onClick}>
            SALVAR
        </div>
    );
};


export default SaveButton;