const resource = '/apis/learn_languages'
export default ($api) => ({

  fetchLearnLanguages(payload) {
    return $api.get(`${resource}/fetchLearnLanguages.php`, { params: { input: payload.input } })
  },

  fetchLearnLanguage(payload) {
    return $api.get(`${resource}/fetchLearnLanguage.php`, { params: { input: payload.input } })
  },

  show_edit(payload) {
    return $api.get(`${resource}/show_edit.php`, payload)
  },

  fetchLanguageWords(payload) {
    return $api.get(`${resource}/fetchLanguageWords.php`, { params: { input: payload.input } })
  },

  fetchLanguageExamples(payload) {
    return $api.get(`${resource}/fetchLanguageExamples.php`, { params: { input: payload.input } })
  },
  
  view(payload) {
    return $api.get(`${resource}/view.php`, payload)
  },

  change_positions(payload) {
    return $api.post(`${resource}/change_positions.php`, payload)
  },

  changePositionItemDev(payload) {
    return $api.post(`${resource}/changePositionItemDev.php`, payload)
  },

  create(payload) {
    return $api.post(`${resource}/create.php`, payload)
  },
  
  createLanguageCategory(payload) {
    return $api.post(`${resource}/createLanguageCategory.php`, payload)
  },
  createLanguageTopic(payload) {
    return $api.post(`${resource}/createLanguageTopic.php`, payload)
  },
  
  updateLanguageTopic(payload) {
    return $api.post(`${resource}/updateLanguageTopic.php`, payload)
  },
  updateLanguage(payload) {
    return $api.post(`${resource}/updateLanguage.php`, payload)
  },
  createLanguageWord(payload) {
    return $api.post(`${resource}/createLanguageWord.php`, payload)
  },
  updateLanguageWord(payload) {
    return $api.post(`${resource}/updateLanguageWord.php`, payload)
  },
  createLanguageExample(payload) {
    return $api.post(`${resource}/createLanguageExample.php`, payload)
  },
  updateLanguageExample(payload) {
    return $api.post(`${resource}/updateLanguageExample.php`, payload)
  },
  
  updateLanguageItem(payload) {
    return $api.post(`${resource}/updateLanguageItem.php`, payload)
  },

  update(id, payload) {
    return $api.post(`${resource}/${id}`, payload)
  },

  delete(payload) {
    return $api.get(`${resource}/delete.php`, payload)
  }

})