
document.getElementById('bmi-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const activity = document.getElementById('activity').value;

    const bmi = weight / (height * height);
    let category = '';
    let explanation = '';

    if (bmi < 18.5) {
      category = 'کم‌وزن';
      explanation = 'BMI کمتر از 18.5 نشان‌دهنده کم‌وزنی است. این می‌تواند خطر برخی مشکلات سلامتی را افزایش دهد.';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'نرمال';
      explanation = 'BMI بین 18.5 و 24.9 نشان‌دهنده وزن سالم است. این محدوده با کمترین خطر مشکلات سلامتی مرتبط است.';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'اضافه وزن';
      explanation = 'BMI بین 25 و 29.9 نشان‌دهنده اضافه وزن است. این می‌تواند خطر برخی مشکلات سلامتی را افزایش دهد.';
    } else {
      category = 'چاق';
      explanation = 'BMI 30 یا بیشتر نشان‌دهنده چاقی است. این می‌تواند خطر بسیاری از مشکلات سلامتی را به طور قابل توجهی افزایش دهد.';
    }

    const resultElement = document.getElementById('result-box');
    resultElement.innerHTML = `
      <h3>نتیجه محاسبه BMI</h3>
      <p>شاخص توده بدنی (BMI) شما: <strong>${bmi.toFixed(2)}</strong></p>
      <p>دسته‌بندی: <strong>${category}</strong></p>

      
    `;
    resultElement.className = `result-box ${category.toLowerCase()}`;

    document.getElementById('explanation').innerHTML = `
      <h3>توضیحات</h3>
      <p>${explanation}</p>
    `;

    function ChangeBackground(){
      //for add background class
      const resultBox = document.getElementById('result-box');

      // Remove any existing BMI state classes
      resultBox.classList.remove('underweight', 'normal', 'overweight', 'obese');

      // Add the appropriate class based on BMI
      if (bmi < 18.5) {
      resultBox.classList.add('underweight');
      } else if (bmi >= 18.5 && bmi < 24.9) {
      resultBox.classList.add('normal');
      } else if (bmi >= 25 && bmi < 29.9) {
      resultBox.classList.add('overweight');
      } else if (bmi >= 30) {
      resultBox.classList.add('obese');
      }
  }
  ChangeBackground();






    // AI recommendations based on BMI, gender, age, and activity level
    const aiRecommendations = getAIRecommendations(bmi, gender, age, activity);
    const aiRecommendationsHtml = aiRecommendations.map(rec => `
      <div class="recommendation-item">
        <h4>${rec.title}</h4>
        <p>${rec.description}</p>
      </div>
    `).join('');

    document.getElementById('ai-recommendations').innerHTML = `
      <h3>توصیه‌های هوشمند AI</h3>
      ${aiRecommendationsHtml}
    `;
  });

  function getAIRecommendations(bmi, gender, age, activity) {
    const recommendations = [];

    // Diet recommendations
    if (bmi < 18.5) {
      recommendations.push({
        title: "افزایش کالری دریافتی",
        description: "برای افزایش وزن سالم، مصرف غذاهای سرشار از پروتئین، کربوهیدرات‌های پیچیده و چربی‌های سالم را افزایش دهید."
      });
    } else if (bmi >= 25) {
      recommendations.push({
        title: "کاهش کالری دریافتی",
        description: "برای کاهش وزن، مصرف غذاهای کم کالری و سرشار از فیبر مانند سبزیجات و میوه‌ها را افزایش دهید."
      });
    }

    // Exercise recommendations
    if (activity === "sedentary") {
      recommendations.push({
        title: "افزایش فعالیت بدنی",
        description: "سعی کنید روزانه حداقل 30 دقیقه پیاده‌روی سریع انجام دهید یا در فعالیت‌های ورزشی سبک شرکت کنید."
      });
    } else if (activity === "very_active" || activity === "extra_active") {
      recommendations.push({
        title: "حفظ تعادل در ورزش",
        description: "مطمئن شوید که به بدن خود استراحت کافی می‌دهید و تغذیه مناسب برای حمایت از فعالیت‌های شدید خود دارید."
      });
    }

    // Age-specific recommendations
    if (age >= 50) {
      recommendations.push({
        title: "تقویت استخوان‌ها",
        description: "برای حفظ سلامت استخوان‌ها، مصرف کلسیم و ویتامین D را افزایش دهید و تمرینات قدرتی را در برنامه ورزشی خود بگنجانید."
      });
    }

    // Gender-specific recommendations
    if (gender === "female") {
      recommendations.push({
        title: "دریافت آهن کافی",
        description: "برای جلوگیری از کم‌خونی، مصرف منابع غنی از آهن مانند گوشت قرمز کم‌چرب، حبوبات و سبزیجات برگ سبز را افزایش دهید."
      });
    } else {
      recommendations.push({
        title: "کنترل فشار خون",
        description: "برای کاهش خطر بیماری‌های قلبی، مصرف نمک را محدود کنید و فعالیت بدنی منظم داشته باشید."
      });
    }

    return recommendations;
  }