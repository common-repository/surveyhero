const {
    Dashicon,
    Toolbar,
    Button,
    Tooltip,
} = wp.components;

export class SurveyToolbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onEdit();
    }

    render() {
        return (
            <Toolbar className='components-toolbar'>
                <Tooltip text={'Change Embed Code'}>
                    <Button className={'components-icon-button components-toolbar__control'} onClick={this.handleClick}>
                        <Dashicon icon="edit"/>
                    </Button>
                </Tooltip>
            </Toolbar>
        );
    }
}