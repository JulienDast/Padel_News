module.exports.signUpErrors = (err) => {
  let errors = {pseudo : '', email: '', password: ''};

  if(err.message.includes('pseudo'))
    errors.pseudo = 'Pseudo incorrect ou déjà utilisé';

  if(err.message.includes('email'))
    errors.email = 'Email incorrect';

  if(err.message.includes('password'))
    errors.password = 'Mot de passe : minimum 6 caractères';

  if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Pseudo déjà utilisé";

  if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Email déjà utilisé";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = {email: '', password: ''};

  if(err.message.includes('email'))
    errors.email = 'Email inconnu'

  if(err.message.includes('password'))
  errors.password = 'Mot de passe incorrect';

  return errors;
};

module.exports.handleProfileUpdateErrors = (err) => {
  let errors = { name: '', file: '' };

  if (err.message.includes('Invalid file format')) {
    errors.file = 'Format de fichier invalide. Seuls les formats JPEG, JPG ou PNG sont autorisés.';
  }

  if (err.message.includes('File size exceeds the limit')) {
    errors.file = 'La taille du fichier dépasse la limite. La taille maximale autorisée est de 5 Mo.';
  }

  if (err.message.includes('Failed to update user profile')) {
    errors.name = 'Échec de la mise à jour du profil utilisateur.';
  }

  return errors;
};