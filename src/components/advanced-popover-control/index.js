const { Button, Popover, IconButton } = wp.components;
const { Fragment, createRef, Component } = wp.element;
const { __ } = wp.i18n;

export default class AdvancedPopOverControl extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false };
		this.buttonRef = createRef();
	}

	render() {
		const popverBtnClass = "apc-icon-btn components-button is-secondary is-small";

		const handleOpen = () => {
			this.setState({ open: !this.state.open });
		};

		const handleClose = () => {
			this.setState({ open: false });
		};

		const handleOnClickOutside = (event) => {
			if (
				event.relatedTarget &&
				!event.relatedTarget.closest(`.${popverBtnClass}`) &&
				event.relatedTarget !== this.buttonRef.current
			) {
				handleClose();
			}
		};

		return (
			<Fragment>
				<div className="components-base-control">
					<div
						className={
							"vk-blocks-button-icon-control__wrapper components-base-control__field"
						}
					>
						<Button
							isTertiary
							className={ `${popverBtnClass} mb-1` }
							onClick={ handleOpen }
							ref={ this.buttonRef }
						>
							{ this.props.label }
						</Button>
						{ this.state.open && this.buttonRef.current && (
							<Popover
								anchorRect={ this.buttonRef.current.getBoundingClientRect() }
								children={ this.props.renderComp }
								onFocusOutside={ handleOnClickOutside }
								focusOnMount={ "container" }
								className={ "vk-blocks-advanced-popover-control" }
							></Popover>
						) }
					</div>
				</div>
			</Fragment>
		);
	}
}
