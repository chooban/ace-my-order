import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const styles = () => {
  return createStyles({
    root: {
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '7px',
      marginBottom: '7px',
      alignContent: 'center',
      padding: '0 7px 0 7px',
      flexGrow: 1
    },
  })
}

function Privacy({ classes }: WithStyles<typeof styles>) {
  return (
    <Paper className={classes.root}>
      <h3>Privacy Policy</h3>
      <h4>What is this Privacy Policy for?</h4>
      <p>This privacy policy is for this website
      and governs the privacy of its users who choose to use it.</p>

      <h5>tl;dr</h5>
      <p>If you put things in the cart it'll save that information to the
      local storage available in your browser. If you sign up for an account
      then I will have access to basic information about your social media
      account and you'll have a cookie from the login provider. I have no
      interest in selling your data to anyone and never will.</p>

      <h4>How we protect your information</h4>
      <p>All data exchanged between the Site and its Users happens over a SSL
      secured communication channel and is encrypted and
      protected with digital signatures.</p>

      <h4>Personal Identification Information</h4>
      <p>We may collect personal identification information from Users in a variety of ways, including, but not limited
      to:<br />
      <ul>
        <li>When users register on the site</li>
        <li>When Registered Users visit the site</li>
        <li>When Registered Users make use of features of the site</li>
      </ul>
      Users may, however, visit our Site anonymously.</p>

      <p>We will collect personal identification information from Users only if they voluntarily submit such information to us.
      Users can always refuse to supply personally identification information, except that it may prevent them from engaging
      in certain Site related activities.</p>

      <h4>Non-personal identification information</h4>
      <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal
      identification information may include the browser name, the type of computer and technical information about Users
      means of connection to our Site, such as the operating system and the Internet service providers utilized and other
      similar information.</p>

      <h4>Cookies</h4>
      <p>Our Site may use “cookies” to enhance User experience. User’s web browser places cookies on their hard drive for
      record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to
      refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not
      function properly.</p>

      <h4>Your acceptance of these terms</h4>
      <p>By using this Site, you signify your acceptance of this policy and terms of service. If you do not agree to this policy,
      please do not use our Site.</p>
    </Paper>
  )
}

const styled = withStyles(styles, { withTheme: true })(Privacy)

export { styled as Privacy }
