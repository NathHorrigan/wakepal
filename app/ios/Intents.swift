//
//  Intents.swift
//  WakePal
//
//  Created by Nathan Horrigan on 13/05/2020.
//  Copyright © 2020 Nathan Horrigan. All rights reserved.
//

import Foundation

@objc
class SiriIntent: NSObject {
  @objc
  func setupIntents(view: UIView) {
      let activity = NSUserActivity(activityType: "com.wakepal.showSleep") // 1
      activity.title = "Say Hi" // 2
      activity.userInfo = ["speech" : "hi"] // 3
      activity.isEligibleForSearch = true // 4
      activity.isEligibleForPrediction = true // 5
      activity.persistentIdentifier = NSUserActivityPersistentIdentifier("com.wakepal.showSleep") // 6
      view.userActivity = activity // 7
      activity.becomeCurrent() // 8
  }
  
  @objc
   func continueUserActivity(application: UIApplication) {
  }
}
