import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

interface OwnProps {
  searchTerm: string,
  onTermChanged(existingTerm: string, newSearchTerm: string): void
}

interface OwnState {
  text: string
}

const styles = () => {
  return createStyles({
    root: {
      display: 'flex',
      gap: '5px',
      alignItems: 'center',
      '&>.editableSearch': {
      },
      cursor: 'pointer'
    }
  })
}

type CombinedProps = OwnProps & WithStyles<typeof styles>

class EditableSearchTerm extends React.Component<CombinedProps, OwnState> {
  contentEditable: any
  searchRef: any

  constructor(props: CombinedProps) {
    super(props)
    this.contentEditable = React.createRef()
    this.state = {
      text: props.searchTerm
    }
    this.searchRef = React.createRef()
  }

  handleChange = (event: ContentEditableEvent) => {
    this.setState({ text: event.target.value })
  }

  pastePlainText = (evt: React.ClipboardEvent) => {
    evt.preventDefault()

    const text = evt.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  disableNewlines = (evt: React.KeyboardEvent<HTMLDivElement>) => {
    const keyCode = evt.keyCode || evt.which

    if (keyCode === 13) {
      evt.preventDefault()
      this.props.onTermChanged(this.props.searchTerm, evt.currentTarget.innerText.trim())
    }
  }

  handleBlur = () => {
    this.props.onTermChanged(
      this.props.searchTerm,
      this.state.text.trim()
    )
  }

  render() {
    return <div className={this.props.classes.root}>
      <ContentEditable
        ref={this.searchRef}
        className='editableSearch'
        innerRef={this.contentEditable}
        html={this.state.text}
        onPaste={this.pastePlainText}
        onKeyPress={this.disableNewlines}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
      />
      <CreateIcon fontSize='small' onClick={() => {
        this.contentEditable.current.focus()
      }}/>
    </div>
  }

}

const Styled = withStyles(styles)(EditableSearchTerm)

export { Styled as EditableSearchTerm }
