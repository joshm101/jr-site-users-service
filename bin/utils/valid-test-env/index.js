/**
 * Ensures proper environment variables are defined
 * for a test environment.
 * @return {boolean} - Whether or not required
 * environment variables are set.
 */
const validTestEnv = () => {
  const {
    JR_SITE_TEST_DB_CONNECTION_URI,
    JR_SITE_TEST_DB_CONNECTION_USERNAME,
    JR_SITE_TEST_DB_CONNECTION_PASSWORD
  } = process.env

  if (!JR_SITE_TEST_DB_CONNECTION_URI) {
    console.error(
      'ERROR: JR_SITE_TEST_DB_CONNECTION_URI ' +
      'environment variable is not set. Exiting.'
    )
    return false
  }

  if (!JR_SITE_TEST_DB_CONNECTION_USERNAME) {
    console.error(
      'ERROR: JR_SITE_TEST_DB_CONNECTION_USERNMAE ' +
      'environment variable is not set. Exiting.'
    )
    return false
  }

  if (!JR_SITE_TEST_DB_CONNECTION_PASSWORD) {
    console.error(
      'ERROR: JR_SITE_TEST_DB_CONNECTION_PASSWORD ' +
      'environment variable is not set. Exiting.'
    )
    return false
  }

  return true
}

module.exports = validTestEnv
