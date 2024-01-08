//! Program error types

use spl_program_error::*;

/// Errors that may be returned by the program.
#[spl_program_error]
pub enum AddressLookupError {
    /// Attempted to lookup addresses from a table that does not exist
    #[error("Attempted to lookup addresses from a table that does not exist")]
    LookupTableAccountNotFound,
    /// Attempted to lookup addresses from an account owned by the wrong program
    #[error("Attempted to lookup addresses from an account owned by the wrong program")]
    InvalidAccountOwner,
    /// Attempted to lookup addresses from an invalid account
    #[error("Attempted to lookup addresses from an invalid account")]
    InvalidAccountData,
    /// Address lookup contains an invalid index
    #[error("Address lookup contains an invalid index")]
    InvalidLookupIndex,
    /// Address lookup is immutable
    #[error("Address lookup is immutable")]
    LookupTableImmutable,
    /// Incorrect address lookup authority provided
    #[error("Incorrect address lookup authority provided")]
    IncorrectAuthority,
    // Failed to serialize address lookup table
    #[error("Failed to serialize address lookup table")]
    FailedToSerialize,
    // Failed to deserialize address lookup table
    #[error("Failed to deserialize address lookup table")]
    FailedToDeserialize,
}
