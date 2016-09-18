export default {
  map (objects) {
    let result = []

    for (let val in objects) {
      let c = objects[val]

      result.push({
        'id': c['id'],
        'customer_nr': c['text:customer_nr'],
        'name': c['text:name'],
        'address': c['text:address'],
        'zip': c['text:zip'],
        'city': c['text:city'],
        'state': c['text:state'],
        'country': c['text:country'],
        'phone_number': c['text:phone_number'],
        'website': c['text:website'],
        'interior_designer': c['if:interior_designer'],
        'speciality_shop_for_bath': c['if:speciality_shop_for_bath'],
        'lifestyle_store': c['if:lifestyle_store'],
        'speciality_shop_for_textiles': c['if:speciality_shop_for_textiles'],
        'furniture_store': c['if:furniture_store'],
        'latitude': c['text:latitude'],
        'longitude': c['text:longitude'],
        'visible': true,
        'distance': 0
      })
    }

    return result
  }
}
