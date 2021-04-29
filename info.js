class Info {
  // constructor
  constructor(data) {
    this.info = data;
  }
  getCaseID() {
    return this.info.case_
  }

  getArrest() {
    return this.info.arrest
  }

  getDate() {
    return new Date(this.info.date_of_occurrence)
  }

  getIucr() {
    return this.info._iucr;
  }

  getCategory() {
    return this.info._primary_decsription;
  }

  getDescription() {
    return this.info._secondary_description;
  }

  getDomestic() {
    return this.info.domestic;
  }

  getBeat() {
    return this.info.beat;
  }

  getFbiCd() {
    return this.info.fbi_cd;
  }

  getWard() {
    return this.info.ward;
  }

  getBlockStreet() {
    return this.info.block.substring(this.info.block.indexOf(' ') + 1);
  }

  getBlockCode() {
    return this.info.block.substring(0, this.info.block.indexOf(' '));
  }

  getLocationDescription() {
    return this.info._location_description;
  }

  getX() {
    return this.info.x_coordinate;
  }

  getY() {
    return this.info.y_coordinate;
  }

  getLatitude() {
    return parseFloat(this.info.latitude);
  }

  getLongitude() {
    return parseFloat(this.info.longitude);
  }

  // set the rule of risk, return the risk level
  getRisk() {
    var risk_level = 0;
    //get the get the crime Category of this crime case
    var firstRisk = this.info._primary_decsription;
    //get the arrest for this crime case
    var secondRisk = this.info.arrest;
    // Rule1: for the Category in plusOne, risk_level + 1
    const plusOne = ["OTHER NARCOTIC VIOLATION", "GAMBLING", "OBSCENITY", "LIQUOR LAW VIOLATION", "STALKING", "PROSTITUTION", "RITUALISM", "MOTOR VEHICLE THEFT", "PUBLIC PEACE VIOLATION", "NARCOTICS", "CONCEALED CARRY LICENSE VIOLATION", "DECEPTIVE PRACTICE", "NON-CRIMINAL", "THEFT", "OTHER OFFENSE", "INTERFERENCE WITH PUBLIC OFFICER"];
    for (var i = 0; i < plusOne.length; i++) {
      if (firstRisk == plusOne[i]) {
        risk_level = risk_level + 1;
        break;
      }
    }
    //Rule2: for the Category in plusTwo, risk_level + 2
    const plusTwo = ["BURGLARY", "SEX OFFENSE", "PUBLIC INDECENCY", "WEAPONS VIOLATION", "ASSAULT", "INTIMIDATION", "CRIMINAL DAMAGE", "ARSON", "ROBBERY", "OFFENSE INVOLVING CHILDREN", "CRIMINAL TRESPASS", "BATTERY"]
    for (var j = 0; j < plusTwo.length; j++) {
      if (firstRisk == plusTwo[j]) {
        risk_level = risk_level + 2;
        break;
      }
    }
    //Rule3: for the Category in plusThree, risk_level + 3
    const plusThree = ["HUMAN TRAFFICKING", "CRIMINAL SEXUAL ASSAULT", "KIDNAPPING", "HOMICIDE"]
    for (var k = 0; k < plusThree.length; k++) {
      if (firstRisk == plusThree[k]) {
        risk_level = risk_level + 3;
        break;
      }
    }
    //get the current date
    var today = new Date();
    var date_check = this.getDate();
    //Rule 4: for the crime event happend in month from today, risk_level + 3
    if (date_check <= today) {
      today.setMonth(today.getMonth()-1);
      if (date_check > today) {
        risk_level = risk_level + 3;
      }
    }
    //Rule 5: for the crime event happend before one month but in two month from today, risk_level+2
    if (date_check <= today) {
      today.setMonth(today.getMonth()-2);
      if (date_check > today) {
        risk_level = risk_level + 2;
      }
    }
    // Rule 6: If the Arrest is N, risk_level + 1
    if (secondRisk == 'N') {
      risk_level = risk_level + 1;
    } else {
      risk_level = risk_level;
    }
    //Rule 7: new rule: If the crime happend before the 2 months ago the risk_level + 1
    if (date_check <= today) {
      risk_level = risk_level + 1;
    }
    return risk_level;
  }
}

export default Info;
